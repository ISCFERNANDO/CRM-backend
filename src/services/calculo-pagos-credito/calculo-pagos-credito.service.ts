import { Service } from 'typedi';
import { FormaPago } from '../../enums/forma-pago.enum';
import { FormaPagoService } from '../forma-pago.service';
import { PlazoService } from '../plazo.service';
import {
    CalculoPago,
    CalculoPagoInput,
    CalculoPagoOutput
} from './calculo-pago';
import { CalculoPagoDiario } from './calculo-pago-diario';
import { CalculoPagoMensual } from './calculo-pago-mensual';
import { CalculoPagoQuincenal } from './calculo-pago-quincenal';
import { CalculoPagoSemanal } from './calculo-pago-semanal';
import { CalculoPagoUnaExhibicion } from './calculo-pago-una-exhibicion';

@Service()
export class CalculoPagosPrestamoService {
    constructor(
        private plazoCreditoService: PlazoService,
        private formaPagoService: FormaPagoService,
        private calculoPagoService: CalculoPago
    ) {}

    public async calcularPagos(
        input: CalculoPagoInput
    ): Promise<Array<CalculoPagoOutput>> {
        const [plazoCredito, formaPago] = await Promise.all([
            this.plazoCreditoService.findPlazoById(input.plazoCreditoId),
            this.formaPagoService.findFormaPagoById(input.formaPagoId)
        ]);

        const totalAPagar = this.calculaTotalAPagar(
            +input.montoPrestamo,
            input.porcentajeInteresMensual,
            input.numPagosRestantes ?? plazoCredito.value
        );

        console.log('total a pagar => ', totalAPagar);

        return this.calculaPagosPorFormaPago(
            totalAPagar,
            formaPago.value,
            input
        );
    }

    private calculaTotalAPagar(
        montoPrestamo: number,
        porcentajeInteresMensual: number,
        plazoCredito: number
    ): number {
        return (
            montoPrestamo +
            montoPrestamo * porcentajeInteresMensual * plazoCredito
        );
    }

    private calculaPagosPorFormaPago(
        totalAPagar: number,
        formaPago: number,
        input: CalculoPagoInput
    ): any {
        switch (formaPago) {
            case FormaPago.DIARIO:
                return this.calculoPagoService.calculate(
                    totalAPagar,
                    input,
                    new CalculoPagoDiario()
                );
            case FormaPago.SEMANAL:
                return this.calculoPagoService.calculate(
                    totalAPagar,
                    input,
                    new CalculoPagoSemanal()
                );
            case FormaPago.QUINCENAL:
                return this.calculoPagoService.calculate(
                    totalAPagar,
                    input,
                    new CalculoPagoQuincenal()
                );
            case FormaPago.MENSUAL:
                return this.calculoPagoService.calculate(
                    totalAPagar,
                    input,
                    new CalculoPagoMensual()
                );
            case FormaPago.UNA_SOLA_EXHIBICION:
                return this.calculoPagoService.calculate(
                    totalAPagar,
                    input,
                    new CalculoPagoUnaExhibicion()
                );
        }
    }
}
