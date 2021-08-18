import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { AccessoRepository } from '../repositories/accesso.repository';
import { Messages } from './../constants/messages';
import { AccessDTO } from './../dto/access.dto';
import { RolDTO } from './../dto/rol.dto';
import { RollRepository } from './../repositories/rol.repository';
import { AccessoService } from './accesso.service';

export interface IRollService {
    getAllRolls(): Promise<RolDTO[] | void>;
    addRoll(contract: RolDTO): Promise<RolDTO | void>;
    findRollById(id: string): Promise<RolDTO | void>;
    updateRoll(contract: RolDTO): Promise<RolDTO | void>;
    deleteRoll(id: string): Promise<boolean | void>;
    deleteRollsByIds(ids: string[]): Promise<boolean | void>;
    partialUpdateRoll(contract: RolDTO): Promise<RolDTO | void>;
}

@Service()
export class RollService implements IRollService {
    constructor(
        private rollRepository: RollRepository,
        private accessRepository: AccessoRepository,
        private accessService: AccessoService
    ) {}

    public async getAllRolls(): Promise<void | RolDTO[]> {
        const rolls = await this.rollRepository.getAllRol();
        return rolls.map((item) => this.mapRoll(item));
    }

    public async addRoll(contract: RolDTO): Promise<void | RolDTO> {
        if (await this.accessRepository.checkIfExistAccessName(contract.name)) {
            throw new HttpException(HttpStatus.CONFLICT, Messages.ROLL_EXIST);
        }
        const data = await this.rollRepository.addRol(contract);
        contract.id = data._id;
    }

    public async findRollById(id: string): Promise<void | RolDTO> {
        const data = await this.rollRepository.findById(id);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.ROLL_NOT_FOUND
            );
        }
        const detailsRoll: RolDTO = this.mapRoll(data, true);
        const accesses: AccessDTO[] = await this.getListAccesosQueNoPertenecenRol(
            detailsRoll.accesess.map((item) => item.id)
        );
        detailsRoll.accesess.push(...accesses);
        return detailsRoll;
    }

    public async updateRoll(contract: RolDTO): Promise<void | RolDTO> {
        if (
            await this.accessRepository.checkIfExistAccessName(
                contract.name,
                contract.id
            )
        ) {
            throw new HttpException(HttpStatus.CONFLICT, Messages.ROLL_EXIST);
        }
        const data = await this.rollRepository.updateRol(contract);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.ROLL_NOT_FOUND
            );
        }
        contract.id = data._id;
        return contract;
    }

    public async deleteRoll(id: string): Promise<boolean | void> {
        const isSystem = await this.rollRepository.isSystem(id);
        if (isSystem) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.ROLL_NOT_REMOVABLE
            );
        }
        await this.rollRepository.deleteRol(id);
        return true;
    }

    public async deleteRollsByIds(ids: string[]): Promise<boolean | void> {
        if (await this.checkIfAnyIsFromSystem(ids)) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.ROLL_NOT_REMOVABLE
            );
        }
        await this.rollRepository.deleteByIds(ids);
        return true;
    }

    public async partialUpdateRoll(contract: RolDTO): Promise<void | RolDTO> {
        const data = await this.rollRepository.partialUpdateRol(contract);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.ROLL_NOT_FOUND
            );
        }
        contract.id = data._id;
        return contract;
    }

    private mapRoll(item: any, isDetail: boolean = false): RolDTO {
        const data: RolDTO = {
            id: item._id,
            name: item.name,
            description: item.description,
            isSystem: item.isSystem,
            accesess: [],
            active: item.active
        };
        if (isDetail && item.accesess) {
            data.accesess = [];
        }
        return data;
    }

    private async checkIfAnyIsFromSystem(ids: string[]): Promise<boolean> {
        for (const id of ids) {
            if (await this.rollRepository.isSystem(id)) {
                return true;
            }
        }
        return false;
    }

    private async getListAccesosQueNoPertenecenRol(
        ids: string[]
    ): Promise<AccessDTO[]> {
        const accesses = await this.accessRepository.findIfNotInIds(ids);
        return accesses
            .map(this.accessService.mapAccess)
            .map((item: AccessDTO) => {
                item.active = false;
                return item;
            });
    }
}
