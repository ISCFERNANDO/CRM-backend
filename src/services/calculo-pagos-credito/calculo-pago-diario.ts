import { addDays, compareAsc, differenceInDays, format } from 'date-fns';
import {
    CalculoPagoInput,
    CalculoPagoOutput,
    ICalculoPago
} from './calculo-pago';

export class CalculoPagoDiario implements ICalculoPago {
    public calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput> {
        const fechaExpiracion = new Date(input.fechaExpiracion);
        let cursorDate = new Date(input.fechaExpedicion);

        const numDias: number = differenceInDays(fechaExpiracion, cursorDate);
        const dailyPay = totalAPagar / Math.abs(numDias);
        const pagos: Array<CalculoPagoOutput> = [];
        cursorDate = addDays(cursorDate, 1);
        while (compareAsc(cursorDate, fechaExpiracion) <= 0) {
            pagos.push({
                fechaPago: format(cursorDate, 'MM/dd/yyyy'),
                montoPago: dailyPay
            });
            cursorDate = addDays(cursorDate, 1);
        }
        return pagos;
    }
}
