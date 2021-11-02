import 'reflect-metadata';
import { Service } from 'typedi';
import { PrestamoModel } from '../models';
import { PrestamoDTO } from './../dto/prestamo.dto';

export interface IPrestamoRepository {
    addPrestamo(contract: PrestamoDTO): Promise<any>;
}

@Service()
export class PrestamoRepository implements IPrestamoRepository {
    public addPrestamo = (contract: PrestamoDTO): Promise<any> =>
        PrestamoModel.create(this.prestamoDtoToModel(contract));

    private prestamoDtoToModel(contract: PrestamoDTO): any {
        return {
            autorizadorCredito: contract.autorizadorCreditoId,
            contratanteCredito: contract.contratanteCreditoId,
            datosCredito: {
                fechaExpedicion: contract.datosCredito.fechaExpedicion,
                moneda: contract.datosCredito.moneda,
                montoPrestamo: contract.datosCredito.montoPrestamo,
                formaPago: contract.datosCredito.formaPago,
                plazoCredito: contract.datosCredito.plazoCredito,
                porcentajeInteresMensual:
                    contract.datosCredito.porcentajeInteresMensual,
                porcentajeInteresMoratorio:
                    contract.datosCredito.porcentajeInteresMoratorio,
                totalPagar: contract.datosCredito.totalPagar
            },
            direccion: contract.direccionContratacion,
            deleted: false,
            active: true
        };
    }
}
