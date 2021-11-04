import { addDays, compareAsc, differenceInDays, format } from 'date-fns';
import { CalculoPagoOutput, ICalculoPago } from './calculo-pago';

export class CalculoPagoDiario extends ICalculoPago {
    constructor() {
        super(0);
    }

    protected calculateNumberPayments = (): number =>
        differenceInDays(this.fechaExpiracion, this.fechaExpedicion);

    protected calculateAmountPerPay = (
        totalAPagar: number,
        numberPayments: number
    ): number => Math.trunc(totalAPagar / Math.abs(numberPayments));

    public calculatePayments(
        totalAPagar: number,
        numberPayments: number,
        amountPerPay: number
    ): Array<CalculoPagoOutput> {
        const pagos: Array<CalculoPagoOutput> = [];
        this.fechaExpedicion = addDays(this.fechaExpedicion, 1);
        while (compareAsc(this.fechaExpedicion, this.fechaExpiracion) <= 0) {
            pagos.push({
                fechaPago: format(this.fechaExpedicion, 'MM/dd/yyyy'),
                montoPago: amountPerPay
            });
            this.fechaExpedicion = addDays(this.fechaExpedicion, 1);
        }

        const numPagos = pagos.length;
        pagos[numPagos - 1].montoPago =
            totalAPagar - (numPagos - 1) * amountPerPay;
        return pagos;
    }
}
