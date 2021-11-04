import { differenceInDays } from 'date-fns';
import { Service } from 'typedi';
import { PrestamoItemDTO } from './../dto/prestamo-item.dto';
import { PrestamoDTO } from './../dto/prestamo.dto';
import { PagoPrestamoRepository } from './../repositories/pago-prestamo.model';
import { PrestamoRepository } from './../repositories/prestamo.repository';
import { CalculoPagoOutput } from './calculo-pagos-credito/calculo-pago';
import { CalculoPagosPrestamoService } from './calculo-pagos-credito/calculo-pagos-credito.service';
import { StatusPrestamoService } from './status-prestamo.service';

export interface IPrestamoService {
    addPrestamo(contract: PrestamoDTO): Promise<PrestamoDTO | void>;
    confirmPrestamo(id: string): Promise<void>;
    findAllPrestamos(): Promise<Array<PrestamoItemDTO>>;
}

@Service()
export class PrestamoService implements IPrestamoService {
    constructor(
        private prestamoRepository: PrestamoRepository,
        private calculoPagosService: CalculoPagosPrestamoService,
        private pagoPrestamoRepository: PagoPrestamoRepository,
        private statusPrestamoService: StatusPrestamoService
    ) {}

    async addPrestamo(contract: PrestamoDTO): Promise<void | PrestamoDTO> {
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
        const statusPrestamo = await this.statusPrestamoService.findByKey(
            'PENDIENTE_CONFIRMACION'
        );
        contract.statusPrestamo = statusPrestamo.id;
        const data = await this.prestamoRepository.addPrestamo(contract);
        contract.id = data._id;
        await this.pagoPrestamoRepository.addAllPagoPrestamo(
            pagos,
            contract.id
        );
        contract.pagos = pagos;
        return contract;
    }

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
        const differenceDays = differenceInDays(
            new Date(prestamo.datosCredito.fechaVencimiento),
            currentDate
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
                moneda: prestamo.datosCredito.moneda.name,
                liquidated: prestamo.datosCredito.liquidated
            },
            diasRestantesParaVencimiento:
                differenceDays >= 0 ? differenceDays : 0,
            diasVencidos: differenceDays < 0 ? Math.abs(differenceDays) : 0,
            statusCredito: prestamo.statusPrestamo.name,
            active: prestamo.active
        };

        //id, nombre y apellidos del contratante, telefono, adeudo, fecha vencimiento, liquidado
    }
}
