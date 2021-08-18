import 'reflect-metadata';
import { AccessDTO } from 'src/dto/access.dto';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { AccessoRepository } from '../repositories/accesso.repository';
import { Messages } from './../constants/messages';

export interface IAccessoService {
    getAllAccess(): Promise<AccessDTO[] | void>;
    addAccess(contract: AccessDTO): Promise<AccessDTO | void>;
    updateAccess(contract: AccessDTO): Promise<AccessDTO | void>;
    deleteAccess(id: string): Promise<boolean | void>;
    findAccessById(id: string): Promise<AccessDTO | void>;
    deleteAccessesByIds(ids: string[]): Promise<boolean | void>;
    mapAccess(item: any): AccessDTO;
}

@Service()
export class AccessoService implements IAccessoService {
    constructor(private accessRepository: AccessoRepository) {}

    public async getAllAccess(): Promise<AccessDTO[] | void> {
        const access = await this.accessRepository.getAllAccess();
        return access.map(this.mapAccess);
    }

    public async addAccess(contract: AccessDTO): Promise<AccessDTO | void> {
        if (await this.checkIfExistAccessName(contract.name)) {
            throw new HttpException(HttpStatus.CONFLICT, Messages.ACCESS_EXIST);
        }
        const data = await this.accessRepository.addAccess(contract);
        contract.id = data._id;
        return contract;
    }

    public async updateAccess(contract: AccessDTO): Promise<AccessDTO | void> {
        if (await this.checkIfExistAccessName(contract.name, contract.id)) {
            throw new HttpException(HttpStatus.CONFLICT, Messages.ACCESS_EXIST);
        }
        const data = await this.accessRepository.updateAccess(contract);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.ACCESS_NOT_FOUND
            );
        }
        contract.id = data._id;
        return contract;
    }

    private checkIfExistAccessName = (name: string, id?: string) =>
        this.accessRepository.checkIfExistAccessName(name, id);

    public async deleteAccess(id: string): Promise<boolean | void> {
        const isSystem = await this.accessRepository.isSystem(id);
        if (isSystem) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.ACCESS_NOT_REMOVABLE
            );
        }
        await this.accessRepository.deleteAccess(id);
        return true;
    }

    public async findAccessById(id: string): Promise<AccessDTO | void> {
        const data = await this.accessRepository.findById(id);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.ACCESS_NOT_FOUND
            );
        }
        return this.mapAccess(data);
    }

    public async deleteAccessesByIds(ids: string[]): Promise<boolean | void> {
        if (await this.checkIfAnyIsFromSystem(ids)) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.ACCESS_NOT_REMOVABLE
            );
        }
        await this.accessRepository.deleteByIds(ids);
        return true;
    }

    private async checkIfAnyIsFromSystem(ids: string[]): Promise<boolean> {
        for (const id of ids) {
            if (await this.accessRepository.isSystem(id)) return true;
        }
        return false;
    }

    public mapAccess(item: any): AccessDTO {
        return {
            id: item._id,
            name: item.name,
            route: item.route,
            description: item.description,
            active: item.active,
            isSystem: item.isSystem
        };
    }
}
