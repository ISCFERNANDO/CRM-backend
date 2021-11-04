import {
    CalculoPagoInput,
    CalculoPagoOutput,
    ICalculoPago
} from './calculo-pago';

export class CalculoPagoUnaExhibicion implements ICalculoPago {
    public calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput> {
        return [
            {
                fechaPago: input.fechaExpiracion,
                montoPago: totalAPagar
            }
        ];
    }
}
