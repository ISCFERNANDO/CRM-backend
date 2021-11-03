import { Service } from 'typedi';
import { PlazoDTO } from '../dto/plazo.dto';
import { FormaPagoDTO } from './../dto/forma-pago.dto';
import { FormaPagoRepository } from './../repositories/forma-pago.repository';

@Service()
export class FormaPagoService {
    constructor(private formaPagoRepository: FormaPagoRepository) {}

    async getAllFormasPago(): Promise<PlazoDTO[]> {
        const listOfFormasPago = await this.formaPagoRepository.getAllFormasPago();
        return listOfFormasPago.map(this.mapFormaPago);
    }

    async findFormaPagoById(formaPagoId: string): Promise<PlazoDTO> {
        const formaPago = await this.formaPagoRepository.findFormaPagoById(
            formaPagoId
        );
        return this.mapFormaPago(formaPago);
    }

    private mapFormaPago(data: any): FormaPagoDTO {
        return {
            id: data.id,
            name: data.name,
            value: data.value,
            active: data.active,
            isSystem: data.isSystem
        };
    }
}
