import { NextFunction } from 'express';
import 'reflect-metadata';
import { AccessDTO } from 'src/dto/access.dto';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { AccessoRepository } from '../repositories/accesso.repository';
import { Messages } from './../constants/messages';

export interface IAccessoService {
    getAllAccess(next: NextFunction): Promise<AccessDTO[] | void>;
    addAccess(
        contract: AccessDTO,
        next: NextFunction
    ): Promise<AccessDTO | void>;
    updateAccess(
        contract: AccessDTO,
        next: NextFunction
    ): Promise<AccessDTO | void>;
    deleteAccess(id: string, next: NextFunction): Promise<boolean | void>;
    findAccessById(id: string, next: NextFunction): Promise<AccessDTO | void>;
    deleteAccessesByIds(
        ids: string[],
        next: NextFunction
    ): Promise<boolean | void>;
    mapAccess(item: any): AccessDTO;
}

@Service()
export class AccessoService implements IAccessoService {
    constructor(private accessRepository: AccessoRepository) {}

    public async getAllAccess(next: NextFunction): Promise<AccessDTO[] | void> {
        try {
            const access = await this.accessRepository.getAllAccess();
            return access.map(this.mapAccess);
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.GET_ACCESS_ERROR
                )
            );
        }
    }

    public async addAccess(
        contract: AccessDTO,
        next: NextFunction
    ): Promise<AccessDTO | void> {
        try {
            if (await this.checkIfExistAccessName(contract.name)) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.ACCESS_EXIST
                    )
                );
                return;
            }
            const data = await this.accessRepository.addAccess(contract);
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_ACCESS_ERROR
                )
            );
        }
    }

    public async updateAccess(
        contract: AccessDTO,
        next: NextFunction
    ): Promise<AccessDTO | void> {
        try {
            if (await this.checkIfExistAccessName(contract.name, contract.id)) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.ACCESS_EXIST
                    )
                );
                return;
            }
            const data = await this.accessRepository.updateAccess(contract);
            if (!data) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.ACCESS_NOT_FOUND
                    )
                );
                return;
            }
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.ACCESS_NOT_FOUND
                )
            );
        }
    }

    private checkIfExistAccessName = (name: string, id?: string) =>
        this.accessRepository.checkIfExistAccessName(name, id);

    public async deleteAccess(
        id: string,
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            const isSystem = await this.accessRepository.isSystem(id);
            if (isSystem) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.ACCESS_NOT_REMOVABLE
                    )
                );
                return;
            }
            await this.accessRepository.deleteAccess(id);
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

    public async findAccessById(
        id: string,
        next: NextFunction
    ): Promise<AccessDTO | void> {
        try {
            const data = await this.accessRepository.findById(id);
            return this.mapAccess(data);
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.ACCESS_NOT_FOUND
                )
            );
        }
    }

    public async deleteAccessesByIds(
        ids: string[],
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            if (await this.checkIfAnyIsFromSystem(ids)) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.ACCESS_NOT_REMOVABLE
                    )
                );
                return;
            }
            await this.accessRepository.deleteByIds(ids);
            return true;
        } catch (error) {
            console.log(error);
            next(
                new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.ACCESS_NOT_FOUND
                )
            );
        }
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
