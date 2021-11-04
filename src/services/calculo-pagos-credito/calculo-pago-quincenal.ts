import { addDays, compareAsc, differenceInDays, format } from 'date-fns';
import {
    CalculoPagoInput,
    CalculoPagoOutput,
    ICalculoPago
} from './calculo-pago';

export class CalculoPagoQuincenal implements ICalculoPago {
    private QUINCENA: number = 15;

    public calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput> {
        const fechaExpiracion = new Date(input.fechaExpiracion);
        let cursorDate = new Date(input.fechaExpedicion);

        const numDias: number = differenceInDays(fechaExpiracion, cursorDate);
        const numQuincenas: number = Math.trunc(numDias / this.QUINCENA);

        const exactQuincena =
            compareAsc(
                addDays(cursorDate, numQuincenas * this.QUINCENA),
                fechaExpiracion
            ) === 0;

        const pagoQuincenal = exactQuincena
            ? totalAPagar / Math.abs(numQuincenas)
            : totalAPagar / (Math.abs(numQuincenas) + 1);

        const pagos: Array<CalculoPagoOutput> = [];
        let contQuincenas = 1;
        while (contQuincenas <= numQuincenas) {
            cursorDate = addDays(cursorDate, this.QUINCENA);
            pagos.push({
                fechaPago: format(cursorDate, 'MM/dd/yyyy'),
                montoPago: pagoQuincenal
            });
            contQuincenas++;
        }

        if (compareAsc(cursorDate, fechaExpiracion) < 0) {
            pagos.push({
                fechaPago: format(fechaExpiracion, 'MM/dd/yyyy'),
                montoPago: totalAPagar - pagoQuincenal * numQuincenas
            });
        }

        return pagos;
    }
}
