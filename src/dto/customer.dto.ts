import { PersonDTO } from './person.dto';

export interface CustomerDTO {
    id: string;
    tipoPersona: string;
    razonSocial?: string;
    nombreEmpresa?: string;
    sitioWeb?: string;
    photoUrl?: string;
    telefonos: TelefonoDTO[];
    representante: PersonDTO;
    direccion?: DireccionDTO;
    active: boolean;
}

export interface DireccionDTO {
    codigoPostal: string;
    pais: string;
    estado: string;
    colonia: string;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
}

export interface TelefonoDTO {
    tipoTelefono: number;
    telefono: string;
    extension: string;
}
