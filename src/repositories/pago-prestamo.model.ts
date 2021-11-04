import 'reflect-metadata';
import { Service } from 'typedi';
import { PagoPrestamoModel } from '../models';
import { CalculoPagoOutput } from './../services/calculo-pagos-credito/calculo-pago';

export interface IPagoPrestamoRepository {
    addAllPagoPrestamo(
        contract: Array<CalculoPagoOutput>,
        prestamoId: string
    ): Promise<any>;

    addPagoPrestamo(
        contract: CalculoPagoOutput,
        prestamoId: string
    ): Promise<any>;
}

@Service()
export class PagoPrestamoRepository implements IPagoPrestamoRepository {
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
            pagado: false,
            deleted: false,
            active: true
        };
    }
}
