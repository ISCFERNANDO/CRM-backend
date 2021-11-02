import { Service } from 'typedi';
import { PrestamoDTO } from './../dto/prestamo.dto';
import { PrestamoRepository } from './../repositories/prestamo.repository';

export interface IPrestamoService {
    addPrestamo(contract: PrestamoDTO): Promise<PrestamoDTO | void>;
}

@Service()
export class PrestamoService implements IPrestamoService {
    constructor(private prestamoRepository: PrestamoRepository) {}

    async addPrestamo(contract: PrestamoDTO): Promise<void | PrestamoDTO> {
        const data = await this.prestamoRepository.addPrestamo(contract);
        contract.id = data._id;
        return contract;
    }
}
