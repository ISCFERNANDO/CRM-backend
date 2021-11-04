import 'reflect-metadata';
import { Service } from 'typedi';
import { StatusPrestamoRepository } from '../repositories/status-prestamo.repository';
import { StatusPrestamoDTO } from './../dto/status-prestamo.dto';

export interface IStatusPrestamoService {
    findByKey(key: string): Promise<StatusPrestamoDTO>;
    mapStatusPrestamo(item: any): StatusPrestamoDTO;
}

@Service()
export class StatusPrestamoService implements IStatusPrestamoService {
    constructor(private statusPrestamoRepository: StatusPrestamoRepository) {}

    public async findByKey(key: string): Promise<StatusPrestamoDTO> {
        const statusPrestamo = await this.statusPrestamoRepository.findByKey(
            key
        );
        return this.mapStatusPrestamo(statusPrestamo);
    }

    public mapStatusPrestamo(item: any): StatusPrestamoDTO {
        return {
            id: item._id,
            key: item.key,
            name: item.name,
            description: item.description,
            active: item.active,
            isSystem: item.isSystem
        };
    }
}
