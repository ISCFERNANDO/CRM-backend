import { differenceInCalendarDays, format } from 'date-fns';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { PagoPrestamoRepository } from '../repositories/pago-prestamo.repository';
import { HttpStatus } from './../constants/http-status';
import { Messages } from './../constants/messages';
import { PrestamoItemDTO } from './../dto/prestamo-item.dto';
import { PrestamoDTO } from './../dto/prestamo.dto';
import { SemaforoDTO } from './../dto/semaforo.dto';
import { PrestamoRepository } from './../repositories/prestamo.repository';
import { CajaService } from './caja.service';
import { CalculoPagoOutput } from './calculo-pagos-credito/calculo-pago';
import { CalculoPagosPrestamoService } from './calculo-pagos-credito/calculo-pagos-credito.service';
import { SemaforoService } from './semaforo.service';
import { StatusPrestamoService } from './status-prestamo.service';

export interface IPrestamoService {
    addPrestamo(contract: PrestamoDTO): Promise<PrestamoDTO | void>;
    updatePrestamo(contract: any, prestamoId: string): Promise<any>;
    confirmPrestamo(id: string): Promise<void>;
    findAllPrestamos(): Promise<Array<PrestamoItemDTO>>;
    findPrestamoById(prestamoId: string): Promise<PrestamoItemDTO>;
}

@Service()
export class PrestamoService implements IPrestamoService {
    constructor(
        private prestamoRepository: PrestamoRepository,
        private calculoPagosService: CalculoPagosPrestamoService,
        private pagoPrestamoRepository: PagoPrestamoRepository,
        private statusPrestamoService: StatusPrestamoService,
        private semaforoService: SemaforoService,
        private cajaService: CajaService
    ) {}

    updatePrestamo = (contract: any, prestamoId: string): Promise<any> =>
        this.prestamoRepository.updatePrestamo(prestamoId, contract);

    findPrestamoById = (prestamoId: string): Promise<any> =>
        this.prestamoRepository.findPrestamoById(prestamoId);

    async addPrestamo(contract: PrestamoDTO): Promise<void | PrestamoDTO> {
        const caja = await this.cajaService.findCajaByName('CAJA LUIS');
        if (
            !this.montoMenorABalanceCaja(
                caja.balance,
                contract.datosCredito.montoPrestamo
            )
        ) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.FONDO_INSUFICIENTE_PARA_PRESTAMO
            );
        }
        const pagos: Array<CalculoPagoOutput> = await this.calculoPagosService.calcularPagos(
            {
                fechaExpedicion: contract.datosCredito.fechaExpedicion,
                fechaExpiracion: contract.datosCredito.fechaVencimiento,
                formaPagoId: contract.datosCredito.formaPago,
                montoPrestamo: contract.datosCredito.montoPrestamo,
                plazoCreditoId: contract.datosCredito.plazoCredito,
                porcentajeInteresMensual:
                    contract.datosCredito.porcentajeInteresMensual
            }
        );
        const result: Array<any> = await this.pagoPrestamoRepository.addAllPagoPrestamo(
            pagos,
            contract.id
        );
        const statusPrestamo = await this.statusPrestamoService.findByKey(
            'PENDIENTE_CONFIRMACION'
        );
        contract.statusPrestamo = statusPrestamo.id;
        const data = await this.prestamoRepository.addPrestamo(
            contract,
            result
        );

        //registrar transaccion y ajuste de balance de caja
        await this.cajaService.retiroEfectivoPorPrestamo({
            amountTransaction: contract.datosCredito.montoPrestamo,
            cajaId: caja.id,
            description: 'Expedición de crédito',
            transactionDate: format(new Date(), 'MM/dd/yyyy')
        });

        contract.id = data._id;
        contract.pagos = pagos;
        return contract;
    }

    montoMenorABalanceCaja = (balanceCaja: number, montoEgreso: number) =>
        montoEgreso <= balanceCaja;

    async confirmPrestamo(id: string): Promise<any> {
        const statusPrestamo = await this.statusPrestamoService.findByKey(
            'CONFIRMADA'
        );
        return this.prestamoRepository.updatePrestamo(id, {
            statusPrestamo: statusPrestamo.id
        });
    }

    async findAllPrestamos(): Promise<Array<PrestamoItemDTO>> {
        const prestamos = await this.prestamoRepository.findAllPrestamos();
        const currentDate = new Date();
        return prestamos.map((item) => this.mapPrestamo(item, currentDate));
    }

    private mapPrestamo(prestamo: any, currentDate: any): PrestamoItemDTO {
        const proximoPago = prestamo?.pagos[0] ?? null;
        const differenceDays = proximoPago
            ? differenceInCalendarDays(
                  new Date(proximoPago.fechaPago),
                  currentDate
              )
            : 0;
        const semaforo: SemaforoDTO | null = this.semaforoService.calculateColorSemaforo(
            differenceDays
        );
        return {
            id: prestamo._id,
            autorizadorCreditoId: prestamo.autorizadorCredito,
            contratanteCredito: {
                id: prestamo.contratanteCredito._id,
                name: prestamo.contratanteCredito.representante.name,
                firstSurname:
                    prestamo.contratanteCredito.representante.firstSurname,
                secondSurname:
                    prestamo.contratanteCredito.representante.secondSurname,
                email: prestamo.contratanteCredito.representante.email,
                telefono: prestamo.contratanteCredito.telefonos[0].telefono
            },
            datosCredito: {
                totalPagar: prestamo.datosCredito.totalPagar,
                fechaExpedicion: prestamo.datosCredito.fechaExpedicion,
                fechaVencimiento: prestamo.datosCredito.fechaVencimiento,
                proximoPago: proximoPago
                    ? {
                          id: proximoPago.id,
                          fechaPago: proximoPago.fechaPago,
                          montoPago: proximoPago.monto,
                          montoInteres: proximoPago.montoInteres
                      }
                    : null,
                moneda: prestamo.datosCredito.moneda.name,
                formaPago: prestamo.datosCredito.formaPago.name,
                liquidated: prestamo.datosCredito.liquidated
            },
            diasRestantesParaProximoPago:
                differenceDays >= 0 ? differenceDays : 0,
            diasVencidos: differenceDays < 0 ? Math.abs(differenceDays) : 0,
            semaforo,
            statusCredito: prestamo.statusPrestamo.name,
            active: prestamo.active
        };
    }
}
