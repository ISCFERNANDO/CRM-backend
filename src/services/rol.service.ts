import { NextFunction } from 'express';
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
    getAllRolls(next: NextFunction): Promise<RolDTO[] | void>;
    addRoll(contract: RolDTO, next: NextFunction): Promise<RolDTO | void>;
    findRollById(id: string, next: NextFunction): Promise<RolDTO | void>;
    updateRoll(contract: RolDTO, next: NextFunction): Promise<RolDTO | void>;
    deleteRoll(id: string, next: NextFunction): Promise<boolean | void>;
    deleteRollsByIds(
        ids: string[],
        next: NextFunction
    ): Promise<boolean | void>;
    partialUpdateRoll(
        contract: RolDTO,
        next: NextFunction
    ): Promise<RolDTO | void>;
}

@Service()
export class RollService implements IRollService {
    constructor(
        private rollRepository: RollRepository,
        private accessRepository: AccessoRepository,
        private accessService: AccessoService
    ) {}

    public async getAllRolls(next: NextFunction): Promise<void | RolDTO[]> {
        try {
            const rolls = await this.rollRepository.getAllRol();
            return rolls.map((item) => this.mapRoll(item));
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.GET_ROLLS_ERROR
                )
            );
        }
    }
    public async addRoll(
        contract: RolDTO,
        next: NextFunction
    ): Promise<void | RolDTO> {
        try {
            if (
                await this.accessRepository.checkIfExistAccessName(
                    contract.name
                )
            ) {
                next(
                    new HttpException(HttpStatus.CONFLICT, Messages.ROLL_EXIST)
                );
                return;
            }
            const data = await this.rollRepository.addRol(contract);
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_ROLL_ERROR
                )
            );
        }
    }
    public async findRollById(
        id: string,
        next: NextFunction
    ): Promise<void | RolDTO> {
        try {
            const data = await this.rollRepository.findById(id);
            const detailsRoll: RolDTO = this.mapRoll(data, true);
            const accesses: AccessDTO[] = await this.getListAccesosQueNoPertenecenRol(
                detailsRoll.accesess.map((item) => item.id)
            );
            detailsRoll.accesess.push(...accesses);
            return detailsRoll;
        } catch (error) {
            next(
                new HttpException(HttpStatus.NOT_FOUND, Messages.ROLL_NOT_FOUND)
            );
        }
    }
    public async updateRoll(
        contract: RolDTO,
        next: NextFunction
    ): Promise<void | RolDTO> {
        try {
            if (
                await this.accessRepository.checkIfExistAccessName(
                    contract.name,
                    contract.id
                )
            ) {
                next(
                    new HttpException(HttpStatus.CONFLICT, Messages.ROLL_EXIST)
                );
                return;
            }
            const data = await this.rollRepository.updateRol(contract);
            if (!data) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.ROLL_NOT_FOUND
                    )
                );
                return;
            }
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_ROLL_ERROR
                )
            );
        }
    }
    public async deleteRoll(
        id: string,
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            const isSystem = await this.rollRepository.isSystem(id);
            if (isSystem) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.ROLL_NOT_REMOVABLE
                    )
                );
                return;
            }
            await this.rollRepository.deleteRol(id);
            return true;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.ACCESS_NOT_FOUND
                )
            );
        }
    }
    public async deleteRollsByIds(
        ids: string[],
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            if (await this.checkIfAnyIsFromSystem(ids)) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.ROLL_NOT_REMOVABLE
                    )
                );
                return;
            }
            await this.rollRepository.deleteByIds(ids);
            return true;
        } catch (error) {
            next(
                new HttpException(HttpStatus.NOT_FOUND, Messages.ROLL_NOT_FOUND)
            );
        }
    }
    public async partialUpdateRoll(
        contract: RolDTO,
        next: NextFunction
    ): Promise<void | RolDTO> {
        try {
            const data = await this.rollRepository.partialUpdateRol(contract);
            if (!data) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.ROLL_NOT_FOUND
                    )
                );
                return;
            }
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_ROLL_ERROR
                )
            );
        }
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
