import { AddressDTO } from '@/dto/address.dto';
import { ResponseAddressMultiServicioDTO } from '@/dto/response-address-multiservicio.dto';
import axios from 'axios';
import 'reflect-metadata';
import { Service } from 'typedi';

export interface IAddressRepository {
    getAddressByCp(cp: string): Promise<AddressDTO | null>;
}

@Service()
export class MultiServiciosAddressRepository implements IAddressRepository {
    private ruta = 'https://api-cp.multiservicios-web.com.mx';

    async getAddressByCp(cp: string): Promise<AddressDTO | null> {
        const apiKey = process.env.API_KEY_MULTISERVICIOS_CP;
        const fullRoute = `${this.ruta}/query/info_cp/${cp}?type=simplified&token=${apiKey}`;

        try {
            const response: any = await axios.get(fullRoute);
            if (!response) return null;

            const data: ResponseAddressMultiServicioDTO = response.data;
            if (!data || data.error) return null;

            return {
                codigoPostal: data.response.cp,
                pais: data.response.pais,
                estado: data.response.estado,
                municipio: data.response.municipio,
                colonia: data.response.asentamiento.map((item) => ({
                    id: item,
                    value: item
                }))
            };
        } catch (error) {
            return null;
        }
    }
}
