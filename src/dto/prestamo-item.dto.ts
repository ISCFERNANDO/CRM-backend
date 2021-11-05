import { CalculoPagoOutput } from './../services/calculo-pagos-credito/calculo-pago';
import { DireccionDTO } from './customer.dto';

export interface PrestamoItemDTO {
    id: string;
    autorizadorCreditoId: string;
    contratanteCredito: ContratanteCreditoDTO;
    datosCredito: DatosCreditoDTO;
    direccionContratacion?: DireccionDTO;
    diasRestantesParaProximoPago: number;
    diasVencidos: number;
    statusCredito: string;
    active: boolean;
}

export interface DatosCreditoDTO {
    fechaExpedicion: string;
    fechaVencimiento: string;
    proximoPago: CalculoPagoOutput | null;
    moneda: string;
    totalPagar: number;
    liquidated: boolean;
    formaPago: string;
}

export interface ContratanteCreditoDTO {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname?: string;
    email?: string;
    telefono?: string;
}
