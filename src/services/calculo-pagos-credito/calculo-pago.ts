import {
    addDays,
    compareAsc,
    differenceInCalendarDays,
    format
} from 'date-fns';
import { Service } from 'typedi';

export interface CalculoPagoInput {
    fechaExpedicion: string;
    fechaExpiracion: string;
    montoPrestamo: number;
    formaPagoId: string;
    plazoCreditoId: string;
    porcentajeInteresMensual: number;
}

export interface CalculoPagoOutput {
    fechaPago: string;
    montoPago: number;
}

export abstract class ICalculoPago {
    protected fechaExpiracion: Date;
    protected fechaExpedicion: Date;
    protected fechaExpedicionIsMesInicio: boolean;
    protected numberDays: number;

    constructor(numberDays: number) {
        this.numberDays = numberDays;
    }

    calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput> {
        this.fechaExpedicion = new Date(input.fechaExpedicion);
        this.fechaExpiracion = new Date(input.fechaExpiracion);

        this.fechaExpedicionIsMesInicio =
            parseInt(format(this.fechaExpedicion, 'dd')) === 1;

        const numberPayments = this.calculateNumberPayments();
        const amountPerPay = this.calculateAmountPerPay(
            totalAPagar,
            numberPayments
        );
        return this.calculatePayments(
            totalAPagar,
            numberPayments,
            amountPerPay
        );
    }

    protected calculateNumberPayments(): number {
        const numDias: number = differenceInCalendarDays(
            this.fechaExpiracion,
            this.fechaExpedicion
        );
        return Math.trunc(numDias / this.numberDays);
    }

    protected calculateAmountPerPay = (
        totalAPagar: number,
        numberPayments: number
    ): number => Math.trunc(totalAPagar / Math.abs(numberPayments));

    protected calculatePayments(
        totalAPagar: number,
        numberPayments: number,
        amountPerPay: number
    ): Array<CalculoPagoOutput> {
        const pagos: Array<CalculoPagoOutput> = [];
        this.fechaExpedicion = addDays(this.fechaExpedicion, this.numberDays);
        this.compenseDays();
        while (compareAsc(this.fechaExpedicion, this.fechaExpiracion) <= 0) {
            pagos.push({
                fechaPago: format(this.fechaExpedicion, 'MM/dd/yyyy'),
                montoPago: amountPerPay
            });
            this.fechaExpedicion = addDays(
                this.fechaExpedicion,
                this.numberDays
            );
            this.compenseDays();
        }
        const subTotal = amountPerPay * numberPayments;
        const numPays = pagos.length;
        pagos[numPays - 1].montoPago =
            pagos[numPays - 1].montoPago + (totalAPagar - subTotal);
        pagos[numPays - 1].fechaPago = format(
            this.fechaExpiracion,
            'MM/dd/yyyy'
        );
        return pagos;
    }

    protected compenseDays() {}
}
@Service()
export class CalculoPago {
    calculate(
        totalAPagar: number,
        input: CalculoPagoInput,
        tipoCalculo: ICalculoPago
    ): Array<CalculoPagoOutput> {
        return tipoCalculo.calculate(totalAPagar, input);
    }
}
