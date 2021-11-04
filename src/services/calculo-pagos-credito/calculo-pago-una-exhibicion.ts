import {
    CalculoPagoInput,
    CalculoPagoOutput,
    ICalculoPago
} from './calculo-pago';

export class CalculoPagoUnaExhibicion extends ICalculoPago {
    constructor() {
        super(0);
    }

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
