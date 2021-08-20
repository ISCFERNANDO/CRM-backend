export interface ResponseAddressMultiServicioDTO {
    error: boolean;
    code_error: number;
    error_message: string;
    response: AddressMultiServicioDTO;
}

export interface AddressMultiServicioDTO {
    cp: string;
    asentamiento: string[];
    tipo_asentamiento: string;
    municipio: string;
    estado: string;
    ciudad: string;
    pais: string;
}
