import { NextFunction } from 'express';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { AccessoRepository } from '../repositories/accesso.repository';
import { Messages } from './../constants/messages';
import { AccessDTO } from './../dto/access.dto';
import { RolDTO } from './../dto/rol.dto';
import { UserDTO } from './../dto/user.dto';
import { UserRepository } from './../repositories/user.repository';
import { AccessoService } from './accesso.service';

export interface IUserService {
    getAllUsers(next: NextFunction): Promise<UserDTO[] | void>;
    addUser(contract: UserDTO, next: NextFunction): Promise<UserDTO | void>;
    updateUser(contract: UserDTO, next: NextFunction): Promise<UserDTO | void>;
    findUserById(id: string, next: NextFunction): Promise<UserDTO | void>;
    deleteUser(id: string, next: NextFunction): Promise<boolean | void>;

    deleteUsersByIds(
        ids: string[],
        next: NextFunction
    ): Promise<boolean | void>;

    partialUpdateUser(
        contract: UserDTO,
        next: NextFunction
    ): Promise<UserDTO | void>;
}

@Service()
export class UserService implements IUserService {
    constructor(
        private userRepository: UserRepository,
        private accesoRepository: AccessoRepository,
        private accesoService: AccessoService
    ) {}

    async getAllUsers(next: NextFunction): Promise<void | UserDTO[]> {
        try {
            const users = await this.userRepository.getAllUsers();
            const data = users.map((item) => this.mapUser(item));
            return Promise.all(data);
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.GET_USERS_ERROR
                )
            );
        }
    }

    async addUser(
        contract: UserDTO,
        next: NextFunction
    ): Promise<void | UserDTO> {
        try {
            if (await this.checkIfExistAccessName(contract.name)) {
                next(
                    new HttpException(HttpStatus.CONFLICT, Messages.USER_EXIST)
                );
                return;
            }
            const data = await this.userRepository.addUser(contract);
            contract.id = data._id;
            return contract;
        } catch (error) {
            next(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.ADD_USER_ERROR
                )
            );
        }
    }

    async updateUser(
        contract: UserDTO,
        next: NextFunction
    ): Promise<void | UserDTO> {
        try {
            if (await this.checkIfExistAccessName(contract.name, contract.id)) {
                next(
                    new HttpException(HttpStatus.CONFLICT, Messages.USER_EXIST)
                );
                return;
            }
            const data = await this.userRepository.updateUser(contract);
            if (!data) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.USER_NOT_FOUND
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
                    Messages.ADD_USER_ERROR
                )
            );
        }
    }

    async findUserById(
        id: string,
        next: NextFunction
    ): Promise<void | UserDTO> {
        try {
            const data = await this.userRepository.findById(id);
            return this.mapUser(data, true);
        } catch (error) {
            next(
                new HttpException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND)
            );
        }
    }

    async deleteUser(id: string, next: NextFunction): Promise<boolean | void> {
        try {
            const isSystem = await this.userRepository.isSystem(id);
            if (isSystem) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.USER_NOT_REMOVABLE
                    )
                );
                return;
            }
            await this.userRepository.deleteUser(id);
            return true;
        } catch (error) {
            next(
                new HttpException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND)
            );
        }
    }

    async deleteUsersByIds(
        ids: string[],
        next: NextFunction
    ): Promise<boolean | void> {
        try {
            if (await this.checkIfAnyIsFromSystem(ids)) {
                next(
                    new HttpException(
                        HttpStatus.CONFLICT,
                        Messages.USER_NOT_REMOVABLE
                    )
                );
                return;
            }
            await this.userRepository.deleteByIds(ids);
            return true;
        } catch (error) {
            next(
                new HttpException(HttpStatus.NOT_FOUND, Messages.USER_NOT_FOUND)
            );
        }
    }

    async partialUpdateUser(
        contract: UserDTO,
        next: NextFunction
    ): Promise<void | UserDTO> {
        try {
            const data = await this.userRepository.partialUpdateUser(contract);
            if (!data) {
                next(
                    new HttpException(
                        HttpStatus.NOT_FOUND,
                        Messages.USER_NOT_FOUND
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
                    Messages.ADD_USER_ERROR
                )
            );
        }
    }

    private checkIfExistAccessName = (name: string, id?: string) =>
        this.userRepository.checkIfExistAccessName(name, id);

    private async getListAccesosQueNoPertenecenRol(
        ids: string[]
    ): Promise<AccessDTO[]> {
        const accesses = await this.accesoRepository.findIfNotInIds(ids);
        return accesses
            .map(this.accesoService.mapAccess)
            .map((item: AccessDTO) => {
                item.active = false;
                return item;
            });
    }

    private async getListAccesosQuePertenecenRol(
        ids: string[]
    ): Promise<AccessDTO[]> {
        const accesses = await this.accesoRepository.findIfInIds(ids);
        return accesses.map(this.accesoService.mapAccess);
    }

    async mapUser(item: any, isDetail: boolean = false): Promise<UserDTO> {
        const data: UserDTO = {
            id: item._id,
            name: item.name,
            firstSurname: item.firstSurname,
            secondSurname: item.secondSurname,
            email: item.email,
            phoneNumber: item.phoneNumber,
            age: item.age,
            photoUrl: item.photoUrl,
            isSystem: item.isSystem,
            customRol: item.customRol,
            rol: null,
            accesess: [],
            active: item.active,
            password: item.password,
            imageUrl: item.imageUrl
        };
        if (isDetail) {
            if (item.customRol) {
                data.accesess = [];
                const accesses: AccessDTO[] = await this.getListAccesosQuePertenecenRol(
                    item.accesess.map((a: AccessDTO) => a.id)
                );
                data.accesess.push(...accesses);
            } else {
                data.rol = this.mapRol(item.rol);
                const accesses: AccessDTO[] = await this.getListAccesosQuePertenecenRol(
                    item.rol.accesess
                );
                data.rol.accesess = accesses;
            }
        }

        return data;
    }

    private async checkIfAnyIsFromSystem(ids: string[]): Promise<boolean> {
        for (let id of ids) {
            if (await this.userRepository.isSystem(id)) return true;
        }
        return false;
    }

    private mapRol(item: any): RolDTO {
        return {
            id: item._id,
            name: item.name,
            description: item.description,
            active: item.active,
            isSystem: item.isSystem,
            accesess: []
        };
    }
}
