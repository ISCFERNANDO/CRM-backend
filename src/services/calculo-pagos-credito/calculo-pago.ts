import { Service } from 'typedi';

export interface ICalculoPago {
    calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput>;
}

export interface CalculoPagoInput {
    fechaExpedicion: string;
    fechaExpiracion: string;
    montoPrestamo: number;
    formaPagoId: string;
    plazoCreditoId: string;
    porcentajeInteresMensual: number;
}

export interface CalculoPagoOutput {
    fechaPago: string;
    montoPago: number;
}

@Service()
export class CalculoPago {
    calculate(
        totalAPagar: number,
        input: CalculoPagoInput,
        tipoCalculo: ICalculoPago
    ): Array<CalculoPagoOutput> {
        return tipoCalculo.calculate(totalAPagar, input);
    }
}
