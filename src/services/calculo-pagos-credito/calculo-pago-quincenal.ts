import { addDays, getDay, getDaysInMonth, subDays } from 'date-fns';
import { ICalculoPago } from './calculo-pago';

export class CalculoPagoQuincenal extends ICalculoPago {
    constructor() {
        super(15);
    }

    compenseDays() {
        if (!this.fechaExpedicionIsMesInicio) return;
        if (getDay(this.fechaExpedicion) <= 15) return;
        const numDays: number = getDaysInMonth(this.fechaExpedicion);
        if (numDays === 31) {
            this.fechaExpedicion = addDays(this.fechaExpedicion, 1);
        } else if (numDays === 29) {
            this.fechaExpedicion = subDays(this.fechaExpedicion, 1);
        }
    }
}
