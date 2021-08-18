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
    getAllUsers(): Promise<UserDTO[] | void>;
    addUser(contract: UserDTO): Promise<UserDTO | void>;
    updateUser(contract: UserDTO): Promise<UserDTO | void>;
    findUserById(id: string): Promise<UserDTO | void>;
    deleteUser(id: string): Promise<boolean | void>;
    deleteUsersByIds(ids: string[]): Promise<boolean | void>;
    partialUpdateUser(contract: UserDTO): Promise<UserDTO | void>;
}

@Service()
export class UserService implements IUserService {
    constructor(
        private userRepository: UserRepository,
        private accesoRepository: AccessoRepository,
        private accesoService: AccessoService
    ) {}

    async getAllUsers(): Promise<void | UserDTO[]> {
        const users = await this.userRepository.getAllUsers();
        const data = users.map((item) => this.mapUser(item));
        return Promise.all(data);
    }

    async addUser(contract: UserDTO): Promise<void | UserDTO> {
        if (await this.checkIfExistAccessName(contract.name)) {
            throw new HttpException(HttpStatus.CONFLICT, Messages.USER_EXIST);
        }
        const data = await this.userRepository.addUser(contract);
        contract.id = data._id;
        return contract;
    }

    async updateUser(contract: UserDTO): Promise<void | UserDTO> {
        if (await this.checkIfExistAccessName(contract.name, contract.id)) {
            throw new HttpException(HttpStatus.CONFLICT, Messages.USER_EXIST);
        }
        const data = await this.userRepository.updateUser(contract);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.USER_NOT_FOUND
            );
        }
        contract.id = data._id;
        return contract;
    }

    async findUserById(id: string): Promise<void | UserDTO> {
        const data = await this.userRepository.findById(id);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.USER_NOT_FOUND
            );
        }
        return this.mapUser(data, true);
    }

    async deleteUser(id: string): Promise<boolean | void> {
        const isSystem = await this.userRepository.isSystem(id);
        if (isSystem) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.USER_NOT_REMOVABLE
            );
        }
        await this.userRepository.deleteUser(id);
        return true;
    }

    async deleteUsersByIds(ids: string[]): Promise<boolean | void> {
        if (await this.checkIfAnyIsFromSystem(ids)) {
            throw new HttpException(
                HttpStatus.CONFLICT,
                Messages.USER_NOT_REMOVABLE
            );
        }
        await this.userRepository.deleteByIds(ids);
        return true;
    }

    async partialUpdateUser(contract: UserDTO): Promise<void | UserDTO> {
        const data = await this.userRepository.partialUpdateUser(contract);
        if (!data) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.USER_NOT_FOUND
            );
        }
        contract.id = data._id;
        return contract;
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
