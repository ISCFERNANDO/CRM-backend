import 'reflect-metadata';
import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';
import { Access } from '../domain/entities/access.entity';
import { AccessDTO } from './../dto/access.dto';
import { CrudRepository, ICrudRepository } from './crud.repository';

export interface IAccessoRepository {
    getAllAccess(): Promise<Array<any>>;

    addAccess(contract: AccessDTO): Promise<any>;

    updateAccess(contract: AccessDTO): Promise<any>;

    deleteAccess(id: number): Promise<any>;

    findById(id: number): Promise<any>;

    deleteByIds(ids: number[]): Promise<any>;

    findIfNotInIds(ids: number[]): Promise<any>;

    findIfInIds(ids: number[]): Promise<any>;

    checkIfExistAccessName(name: string, id?: number): Promise<any>;

    isSystem(id: number): Promise<any>;
}

@Service()
export class AccessoRepository implements IAccessoRepository {
    private repository: Repository<Access>;
    private crudRepository: ICrudRepository<Access, number>;

    constructor() {
        this.repository = getRepository(Access);
        this.crudRepository = new CrudRepository(Access);
    }

    public getAllAccess = async (): Promise<Array<any>> =>
        this.crudRepository.findAll();

    public async addAccess(contract: AccessDTO): Promise<any> {
        let metadata = new Access();
        metadata.name = contract.name;
        metadata.route = contract.route;
        metadata.description = contract.description;
        metadata.active = contract.active;
        metadata.deleted = false;
        metadata.isSystem = contract.isSystem;
        metadata.id = await this.crudRepository.save(metadata);
        return metadata;
    }

    public updateAccess(contract: AccessDTO): Promise<any> {
        let metadata = new Access();
        metadata.id = contract.id;
        metadata.name = contract.name;
        metadata.route = contract.route;
        metadata.description = contract.description;
        metadata.active = contract.active;
        metadata.isSystem = contract.isSystem;
        return this.repository.save(metadata);
    }

    public async deleteAccess(id: number): Promise<any> {
        const access = await this.repository.findOne(id);
        if (!access) return;
        access.deleted = true;
        return this.crudRepository.save(access);
    }

    public findById = (id: number): Promise<any> =>
        this.crudRepository.findOne(id);

    public deleteByIds = (ids: number[]): Promise<any> =>
        this.crudRepository.delete(ids);

    public findIfNotInIds = (ids: number[]): Promise<any> =>
        this.repository
            .createQueryBuilder()
            .where('id not in :ids', { ids })
            .andWhere('deleted = false')
            .getMany();

    public findIfInIds = (ids: number[]): Promise<any> =>
        this.repository
            .createQueryBuilder()
            .whereInIds(ids)
            .andWhere('deleted = false')
            .getMany();

    public checkIfExistAccessName(name: string, id?: number): Promise<any> {
        if (!id) {
            return this.repository
                .createQueryBuilder()
                .where('name = :accessName', { accessName: name })
                .andWhere('deleted = false')
                .getOne();
        }
        return this.repository
            .createQueryBuilder()
            .where(`name = :accessName`, { accessName: name })
            .andWhere('deleted = false')
            .andWhere(`id != ${id}`)
            .getOne();
    }

    public isSystem = (id: number): Promise<any> =>
        this.repository
            .createQueryBuilder()
            .where('id = :idAccess', { idAccess: id })
            .andWhere('is_system = true')
            .getOne();
}
