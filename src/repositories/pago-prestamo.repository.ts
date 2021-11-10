import 'reflect-metadata';
import { Service } from 'typedi';
import { PagoPrestamoModel, PrestamoModel } from '../models';
import { CalculoPagoOutput } from '../services/calculo-pagos-credito/calculo-pago';

export interface IPagoPrestamoRepository {
    addAllPagoPrestamo(
        contract: Array<CalculoPagoOutput>,
        prestamoId: string
    ): Promise<any>;

    addPagoPrestamo(
        contract: CalculoPagoOutput,
        prestamoId: string
    ): Promise<any>;

    findPagoPrestamoById(pagoId: string): Promise<any>;

    findPagosPrestamoByPrestamoIdAndNoPagado(
        pagoPrestamoId: string
    ): Promise<any>;

    updatePagoPrestamo(pagoId: string, contract: any): Promise<any>;
}

@Service()
export class PagoPrestamoRepository implements IPagoPrestamoRepository {
    updatePagoPrestamo = (pagoId: string, contract: any): Promise<any> =>
        PagoPrestamoModel.findByIdAndUpdate(pagoId, { ...contract });

    findPagosPrestamoByPrestamoIdAndNoPagado = (
        pagoPrestamoId: string
    ): Promise<any> =>
        PrestamoModel.findOne()
            .where({ _id: pagoPrestamoId })
            .populate({
                path: 'pagos',
                match: {
                    pagado: false
                }
            });

    findPagoPrestamoById = (pagoId: string): Promise<any> =>
        PagoPrestamoModel.findById(pagoId);

    public addAllPagoPrestamo = (
        contract: Array<CalculoPagoOutput>,
        prestamoId: string
    ): Promise<any> => {
        const inserts = contract.map((item) =>
            this.prestamoDtoToModel(item, prestamoId)
        );
        return PagoPrestamoModel.insertMany(inserts);
    };

    public addPagoPrestamo = (
        contract: CalculoPagoOutput,
        prestamoId: string
    ): Promise<any> => {
        return PagoPrestamoModel.create(
            this.prestamoDtoToModel(contract, prestamoId)
        );
    };

    private prestamoDtoToModel(
        contract: CalculoPagoOutput,
        prestamoId: string
    ): any {
        return {
            prestamo: prestamoId,
            fechaPago: contract.fechaPago,
            monto: contract.montoPago,
            montoInteres: contract.montoInteres,
            montoPagado: 0,
            pagoCompleto: false,
            pagoInteres: false,
            pagado: false,
            deleted: false,
            active: true
        };
    }
}
