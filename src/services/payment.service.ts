import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { PagoPrestamoRepository } from '../repositories/pago-prestamo.repository';
import { HttpStatus } from './../constants/http-status';
import { Messages } from './../constants/messages';
import { PaymentRequest } from './../dto/payment.dto';
import { CajaService } from './caja.service';
import { CalculoPagoOutput } from './calculo-pagos-credito/calculo-pago';
import { CalculoPagosPrestamoService } from './calculo-pagos-credito/calculo-pagos-credito.service';
import { PrestamoService } from './prestamo.service';
import { StatusPrestamoService } from './status-prestamo.service';

export interface IPayment {
    makePayment(paymentContract: PaymentRequest): Promise<any>;
}

@Service()
export class PaymentService implements IPayment {
    constructor(
        private cajaService: CajaService,
        private prestamoService: PrestamoService,
        private pagoPrestamoRepository: PagoPrestamoRepository,
        private calculoPagosService: CalculoPagosPrestamoService,
        private statusPrestamoService: StatusPrestamoService
    ) {}

    async makePayment(paymentContract: PaymentRequest): Promise<any> {
        const prestamo = await this.prestamoService.findPrestamoById(
            paymentContract.prestamoId
        );
        await this.recalculateAndUpdatePayments(paymentContract, prestamo);
        await this.updateBalanceCaja(paymentContract);
    }

    private async recalculateAndUpdatePayments(
        paymentContract: PaymentRequest,
        prestamo: any
    ) {
        const payment = await this.pagoPrestamoRepository.findPagoPrestamoById(
            paymentContract.pagoId
        );
        const listOfPagos: string[] = (
            await this.pagoPrestamoRepository.findPagosPrestamoByPrestamoIdAndNoPagado(
                paymentContract.prestamoId
            )
        ).pagos
            .map((item: any) => item._id)
            .filter(
                (id: any) => id.toString() !== paymentContract.pagoId.toString()
            );

        if (
            paymentContract.paymentAmount < payment.monto &&
            !listOfPagos.length
        ) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.PAGO_INCOMPLETO
            );
        }
        if (paymentContract.paymentAmount < payment.montoInteres) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.FUNCTION_NOT_AVAILABLE
            );
            /* await this.pagoPrestamoRepository.updatePagoPrestamo(
                paymentContract.pagoId,
                {
                    montoPagado: paymentContract.paymentAmount,
                    pagado: true,
                    pagoCompleto: false,
                    pagoInteres: false
                }
            );
            //genera moratorio
            return; */
        }

        //cuando abona a capital
        const capitalSobrantePago =
            paymentContract.paymentAmount - payment.monto;
        const pagoCompleto = paymentContract.paymentAmount >= payment.monto;

        const paymentAmount =
            capitalSobrantePago > 0
                ? payment.monto
                : paymentContract.paymentAmount;

        await this.pagoPrestamoRepository.updatePagoPrestamo(
            paymentContract.pagoId,
            {
                montoPagado: paymentAmount,
                pagado: true,
                pagoCompleto,
                pagoInteres: true
            }
        );

        const capitalPago: number = payment.monto - payment.montoInteres;
        const montoPrestamo: number = prestamo.datosCredito.montoPrestamo;
        let capitalPagado: number = prestamo.datosCredito.capitalPagado
            ? prestamo.datosCredito.capitalPagado
            : 0;
        if (capitalSobrantePago >= 0) {
            capitalPagado = capitalPagado + capitalPago + capitalSobrantePago;
        } else {
            capitalPagado =
                capitalPagado + (capitalPago - Math.abs(capitalSobrantePago));
        }
        const nuevoCapital: number = montoPrestamo - capitalPagado;

        let statusPrestamoId;
        //recalcula pagos
        if (listOfPagos.length) {
            const contract = {
                fechaExpedicion: payment.fechaPago,
                fechaExpiracion: prestamo.datosCredito.fechaVencimiento,
                formaPagoId: prestamo.datosCredito.formaPago,
                montoPrestamo: nuevoCapital,
                plazoCreditoId: prestamo.datosCredito.plazoCredito,
                porcentajeInteresMensual:
                    prestamo.datosCredito.porcentajeInteresMensual,
                numPagosRestantes: listOfPagos.length
            };
            const nuevosPagos: Array<CalculoPagoOutput> = await this.calculoPagosService.calcularPagos(
                contract
            );
            const pagosUpdates = [];
            for (let index = 0; index < listOfPagos.length; index++) {
                pagosUpdates.push(
                    this.pagoPrestamoRepository.updatePagoPrestamo(
                        listOfPagos[index].toString(),
                        {
                            montoInteres: nuevosPagos[index].montoInteres,
                            monto: nuevosPagos[index].montoPago
                        }
                    )
                );
            }
            await Promise.all(pagosUpdates);
        } else {
            statusPrestamoId = (
                await this.statusPrestamoService.findByKey('LIQUIDADO')
            ).id;
        }

        await this.updatePaymentsPrestamo(
            paymentContract,
            prestamo,
            capitalPagado,
            statusPrestamoId
        );
    }

    private async updatePaymentsPrestamo(
        paymentContract: PaymentRequest,
        prestamo: any,
        capitalPagado: number,
        statusPrestamoId?: string
    ) {
        const pagosRealizados = prestamo.pagosRealizados ?? [];
        pagosRealizados.push({
            montoPago: paymentContract.paymentAmount,
            fechaPago: paymentContract.paymentDate
        });

        const updateContract: any = {
            pagosRealizados,
            'datosCredito.capitalPagado': capitalPagado
        };
        if (statusPrestamoId) {
            updateContract.statusPrestamo = statusPrestamoId;
        }

        return this.prestamoService.updatePrestamo(
            updateContract,
            paymentContract.prestamoId
        );
    }

    private async updateBalanceCaja(paymentContract: PaymentRequest) {
        const caja = await this.cajaService.findCajaByName('CAJA LUIS');
        return this.cajaService.ingresoEfectivoPorPagoPrestamo({
            amountTransaction: paymentContract.paymentAmount,
            cajaId: caja.id,
            transactionDate: paymentContract.paymentDate,
            description: 'Abono de crédito'
        });
    }
}
