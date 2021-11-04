import { ICalculoPago } from './calculo-pago';

export class CalculoPagoMensual extends ICalculoPago {
    constructor() {
        super(30);
    }
}
