import { addDays, compareAsc, differenceInDays, format } from 'date-fns';
import {
    CalculoPagoInput,
    CalculoPagoOutput,
    ICalculoPago
} from './calculo-pago';

export class CalculoPagoSemanal implements ICalculoPago {
    private SEMANA: number = 7;

    public calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput> {
        const fechaExpiracion = new Date(input.fechaExpiracion);
        let cursorDate = new Date(input.fechaExpedicion);

        const numDias: number = differenceInDays(fechaExpiracion, cursorDate);
        const numSemanas: number = Math.trunc(numDias / this.SEMANA);

        const exactWeeks =
            compareAsc(
                addDays(cursorDate, numSemanas * this.SEMANA),
                fechaExpiracion
            ) === 0;

        const pagoSemanal = exactWeeks
            ? totalAPagar / Math.abs(numSemanas)
            : totalAPagar / (Math.abs(numSemanas) + 1);

        const pagos: Array<CalculoPagoOutput> = [];
        let contSemanas = 1;
        while (contSemanas <= numSemanas) {
            cursorDate = addDays(cursorDate, this.SEMANA);
            pagos.push({
                fechaPago: format(cursorDate, 'MM/dd/yyyy'),
                montoPago: pagoSemanal
            });
            contSemanas++;
        }

        if (compareAsc(cursorDate, fechaExpiracion) < 0) {
            pagos.push({
                fechaPago: format(fechaExpiracion, 'MM/dd/yyyy'),
                montoPago: totalAPagar - pagoSemanal * numSemanas
            });
        }

        return pagos;
    }
}
