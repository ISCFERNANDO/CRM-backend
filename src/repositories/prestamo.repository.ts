import 'reflect-metadata';
import { Service } from 'typedi';
import { PrestamoModel } from '../models';
import { PrestamoDTO } from './../dto/prestamo.dto';

export interface IPrestamoRepository {
    addPrestamo(contract: PrestamoDTO, pagos: Array<any>): Promise<any>;
    updatePrestamo(id: string, contract: any): Promise<any>;
    findAllPrestamos(): Promise<Array<any>>;
    findPrestamoById(prestamoId: string): Promise<any>;
}

@Service()
export class PrestamoRepository implements IPrestamoRepository {
    findPrestamoById = (prestamoId: string): Promise<any> =>
        PrestamoModel.findById(prestamoId);

    public addPrestamo = (
        contract: PrestamoDTO,
        pagos: Array<any>
    ): Promise<any> => {
        contract.datosCredito.liquidated = false;
        return PrestamoModel.create(this.prestamoDtoToModel(contract, pagos));
    };

    public updatePrestamo = (id: string, contract: any): Promise<any> =>
        PrestamoModel.findByIdAndUpdate(id, { ...contract });

    public async findAllPrestamos(): Promise<Array<any>> {
        //const currentDate = new Date();
        return PrestamoModel.where({ deleted: false })
            .populate('contratanteCredito')
            .populate('datosCredito.moneda')
            .populate('datosCredito.formaPago')
            .populate('statusPrestamo')
            .populate({
                path: 'pagos',
                match: {
                    pagado: false
                    //fechaPago: { $lte: currentDate }
                },
                options: {
                    sort: { fechaPago: 1 }
                }
            });
    }

    private prestamoDtoToModel(contract: PrestamoDTO, pagos: Array<any>): any {
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
                liquidated: contract.datosCredito.liquidated,
                montoPagado: 0,
                capitalPagado: 0
            },
            direccion: contract.direccionContratacion,
            statusPrestamo: contract.statusPrestamo,
            pagos: pagos.map((item) => item._id),
            pagosRealizados: [],
            deleted: false,
            active: true
        };
    }
}
