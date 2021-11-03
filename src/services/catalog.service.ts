import { Service } from 'typedi';
import { CatalogDTO } from '../dto/catalog.dto';
import { CatalogRepository } from '../repositories/catalog.repository';

@Service()
export class CatalogService {
    constructor(private catalogRepository: CatalogRepository) {}

    async findAllCurrency(): Promise<CatalogDTO[]> {
        const listOfTypeCurrency = await this.catalogRepository.getAllCurrency();
        return listOfTypeCurrency.map(this.mapCatalog);
    }

    private mapCatalog(data: any): CatalogDTO {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            active: data.active,
            isSystem: data.isSystem
        };
    }
}
