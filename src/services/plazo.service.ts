import { Service } from 'typedi';
import { PlazoDTO } from './../dto/plazo.dto';
import { PlazoRepository } from './../repositories/plazo.repository';

@Service()
export class PlazoService {
    constructor(private plazoRepository: PlazoRepository) {}

    async getAllPlazosPago(): Promise<PlazoDTO[]> {
        const listOfPlazos = await this.plazoRepository.getAllPlazos();
        return listOfPlazos.map(this.mapPlazo);
    }

    async findPlazoById(plazoCreditoId: string): Promise<PlazoDTO> {
        const plazoCredito = await this.plazoRepository.findPlazoById(
            plazoCreditoId
        );
        return this.mapPlazo(plazoCredito);
    }

    private mapPlazo(data: any): PlazoDTO {
        return {
            id: data.id,
            name: data.name,
            value: data.value,
            active: data.active,
            isSystem: data.isSystem
        };
    }
}
