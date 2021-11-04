import { ICalculoPago } from './calculo-pago';

export class CalculoPagoSemanal extends ICalculoPago {
    constructor() {
        super(7);
    }
}
