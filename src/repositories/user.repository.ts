import { Service } from 'typedi';
import { UserModel } from '../models';
import { UserDTO } from './../dto/user.dto';

export interface IUserRepository {
    getAllUsers(): Promise<Array<any>>;
    addUser(contract: UserDTO): Promise<any>;
    updateUser(contract: UserDTO): Promise<any>;
    partialUpdateUser(contract: UserDTO): Promise<any>;
    deleteUser(id: string): Promise<any>;
    findById(id: string): Promise<any>;
    findByEmailAndPassword(email: string, password: string): Promise<any>;
    deleteByIds(ids: string[]): Promise<any>;
    checkIfExistAccessName(name: string, id?: string): Promise<any>;
    isSystem(id: string): Promise<any>;
}

@Service()
export class UserRepository implements IUserRepository {
    getAllUsers = (): Promise<Array<any>> =>
        UserModel.where({ deleted: false });

    addUser = (contract: UserDTO): Promise<any> =>
        UserModel.create(this.userDtoToModel(contract));

    updateUser = (contract: UserDTO): Promise<any> =>
        UserModel.findByIdAndUpdate(contract.id, this.userDtoToModel(contract));

    partialUpdateUser = (contract: UserDTO): Promise<any> =>
        UserModel.findByIdAndUpdate(contract.id, { ...contract });

    deleteUser = (id: string): Promise<any> =>
        UserModel.findByIdAndUpdate(id, { deleted: true });

    findById = (id: string): Promise<any> =>
        UserModel.findById(id)
            .where({ deleted: false })
            .populate('rol')
            .populate('accesess');

    findByEmailAndPassword = (email: string, password: string): Promise<any> =>
        UserModel.findOne({
            deleted: false,
            email,
            password,
            active: true
        })
            .populate('rol')
            .populate('accesess');

    deleteByIds(ids: string[]): Promise<any> {
        const promises = ids.map((item) => this.deleteUser(item));
        return Promise.all(promises);
    }

    checkIfExistAccessName(name: string, id?: string): Promise<any> {
        if (!id) {
            return UserModel.findOne().where({ deleted: false, name: name });
        }
        return UserModel.findOne().where({
            deleted: false,
            name: name,
            _id: { $ne: id }
        });
    }

    isSystem = (id: string): Promise<any> =>
        UserModel.findOne().where({ _id: id, isSystem: true });

    private userDtoToModel(contract: UserDTO): any {
        return {
            name: contract.name,
            firstSurname: contract.firstSurname,
            secondSurname: contract.secondSurname,
            email: contract.email,
            phoneNumber: contract.phoneNumber,
            age: contract.age,
            photoUrl: contract.photoUrl,
            customRol: contract.customRol,
            isSystem: contract.isSystem,
            active: contract.active,
            deleted: false,
            accesess: contract.customRol
                ? contract.accesess.map((item) => ({
                      _id: item.id
                  }))
                : [],
            rol: !contract.customRol
                ? {
                      _id: contract.rol?.id
                  }
                : null,
            password: contract.password,
            imageUrl: contract.imageUrl
        };
    }
}
