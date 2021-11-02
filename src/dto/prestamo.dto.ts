import { DireccionDTO } from './customer.dto';

export interface PrestamoDTO {
    id: string;
    autorizadorCreditoId: string;
    contratanteCreditoId: string;
    datosCredito: DatosCreditoDTO;
    direccionContratacion: DireccionDTO;
    active: boolean;
}

export interface DatosCreditoDTO {
    fechaExpedicion: string;
    moneda: string;
    montoPrestamo: number;
    formaPago: string;
    plazoCredito: string;
    porcentajeInteresMensual: number;
    porcentajeInteresMoratorio: number;
    totalPagar: number;
}
