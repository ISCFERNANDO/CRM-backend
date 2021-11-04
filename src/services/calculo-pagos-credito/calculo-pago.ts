import { addDays, compareAsc, differenceInDays, format } from 'date-fns';
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
    protected numberDays: number;

    constructor(numberDays: number) {
        this.numberDays = numberDays;
    }

    calculate(
        totalAPagar: number,
        input: CalculoPagoInput
    ): Array<CalculoPagoOutput> {
        this.fechaExpiracion = new Date(input.fechaExpiracion);
        this.fechaExpedicion = new Date(input.fechaExpedicion);

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
        const numDias: number = differenceInDays(
            this.fechaExpiracion,
            this.fechaExpedicion
        );
        return Math.trunc(numDias / this.numberDays);
    }

    protected calculateAmountPerPay(
        totalAPagar: number,
        numberPayments: number
    ): number {
        const exactNumberPayments =
            compareAsc(
                addDays(this.fechaExpedicion, numberPayments * this.numberDays),
                this.fechaExpiracion
            ) === 0;

        return exactNumberPayments
            ? Math.trunc(totalAPagar / Math.abs(numberPayments))
            : Math.trunc(totalAPagar / (Math.abs(numberPayments) + 1));
    }

    protected calculatePayments(
        totalAPagar: number,
        numberPayments: number,
        amountPerPay: number
    ): Array<CalculoPagoOutput> {
        const pagos: Array<CalculoPagoOutput> = [];
        let contPayment = 1;
        while (contPayment <= numberPayments) {
            this.fechaExpedicion = addDays(
                this.fechaExpedicion,
                this.numberDays
            );
            pagos.push({
                fechaPago: format(this.fechaExpedicion, 'MM/dd/yyyy'),
                montoPago: amountPerPay
            });
            contPayment++;
        }

        if (compareAsc(this.fechaExpedicion, this.fechaExpiracion) < 0) {
            pagos.push({
                fechaPago: format(this.fechaExpiracion, 'MM/dd/yyyy'),
                montoPago: totalAPagar - amountPerPay * numberPayments
            });
        }

        const numPagos = pagos.length;
        pagos[numPagos - 1].montoPago =
            totalAPagar - (numPagos - 1) * amountPerPay;

        return pagos;
    }
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
