import { differenceInCalendarDays } from 'date-fns';
import { ICalculoPago } from './calculo-pago';

export class CalculoPagoDiario extends ICalculoPago {
    constructor() {
        super(1);
    }

    protected calculateNumberPayments = (): number =>
        differenceInCalendarDays(this.fechaExpiracion, this.fechaExpedicion);
}
