export interface AddressDTO {
    codigoPostal: string;
    pais: string;
    estado: string;
    municipio: string;
    colonia: ColoniaDTO[];
}

export interface ColoniaDTO {
    id: string;
    value: string;
}
