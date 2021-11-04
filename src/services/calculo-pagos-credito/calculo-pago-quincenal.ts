import { ICalculoPago } from './calculo-pago';

export class CalculoPagoQuincenal extends ICalculoPago {
    constructor() {
        super(15);
    }
}
