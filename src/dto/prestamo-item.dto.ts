import { DireccionDTO } from './customer.dto';

export interface PrestamoItemDTO {
    id: string;
    autorizadorCreditoId: string;
    contratanteCredito: ContratanteCreditoDTO;
    datosCredito: DatosCreditoDTO;
    direccionContratacion?: DireccionDTO;
    diasRestantesParaVencimiento: number;
    diasVencidos: number;
    statusCredito: string;
    active: boolean;
}

export interface DatosCreditoDTO {
    fechaExpedicion: string;
    moneda: string;
    totalPagar: number;
    fechaVencimiento: string;
    liquidated: boolean;
}

export interface ContratanteCreditoDTO {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname?: string;
    email?: string;
    telefono?: string;
}
