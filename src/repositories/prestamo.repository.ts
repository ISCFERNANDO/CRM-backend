import 'reflect-metadata';
import { Service } from 'typedi';
import { PrestamoModel } from '../models';
import { PrestamoDTO } from './../dto/prestamo.dto';

export interface IPrestamoRepository {
    addPrestamo(contract: PrestamoDTO): Promise<any>;

    findAllPrestamos(): Promise<Array<any>>;
}

@Service()
export class PrestamoRepository implements IPrestamoRepository {
    public addPrestamo = (contract: PrestamoDTO): Promise<any> => {
        contract.datosCredito.liquidated = false;
        return PrestamoModel.create(this.prestamoDtoToModel(contract));
    };

    public findAllPrestamos = (): Promise<Array<any>> =>
        PrestamoModel.where({ deleted: false })
            .populate('contratanteCredito')
            .populate('datosCredito.moneda');

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
                totalPagar: contract.datosCredito.totalPagar,
                fechaVencimiento: contract.datosCredito.fechaVencimiento,
                liquidated: contract.datosCredito.liquidated
            },
            direccion: contract.direccionContratacion,
            deleted: false,
            active: true
        };
    }
}
