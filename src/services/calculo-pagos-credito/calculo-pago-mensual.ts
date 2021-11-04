import { addDays, compareAsc, differenceInDays, format } from 'date-fns';
import {
    CalculoPagoInput,
    CalculoPagoOutput,
    ICalculoPago
} from './calculo-pago';

export class CalculoPagoMensual implements ICalculoPago {
    private MES: number = 30;

    public calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput> {
        const fechaExpiracion = new Date(input.fechaExpiracion);
        let cursorDate = new Date(input.fechaExpedicion);

        const numDias: number = differenceInDays(fechaExpiracion, cursorDate);
        const numMeses: number = Math.trunc(numDias / this.MES);

        const exactMonths =
            compareAsc(
                addDays(cursorDate, numMeses * this.MES),
                fechaExpiracion
            ) === 0;

        const pagoMensual = exactMonths
            ? totalAPagar / Math.abs(numMeses)
            : totalAPagar / (Math.abs(numMeses) + 1);

        const pagos: Array<CalculoPagoOutput> = [];
        let contMeses = 1;
        while (contMeses <= numMeses) {
            cursorDate = addDays(cursorDate, this.MES);
            pagos.push({
                fechaPago: format(cursorDate, 'MM/dd/yyyy'),
                montoPago: pagoMensual
            });
            contMeses++;
        }

        if (compareAsc(cursorDate, fechaExpiracion) < 0) {
            pagos.push({
                fechaPago: format(fechaExpiracion, 'MM/dd/yyyy'),
                montoPago: totalAPagar - pagoMensual * numMeses
            });
        }

        return pagos;
    }
}
