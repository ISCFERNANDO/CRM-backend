import { UserModel } from '../models';
import { UserDTO } from './../dto/user.dto';

const getAllUsers = async function (): Promise<Array<any>> {
    return UserModel.where({ deleted: false });
};

const addUser = async function (contract: UserDTO): Promise<any> {
    return UserModel.create(userDtoToModel(contract));
};

const updateUser = async function (contract: UserDTO): Promise<any> {
    return UserModel.findByIdAndUpdate(contract.id, userDtoToModel(contract));
};

const partialUpdateUser = async function (contract: UserDTO): Promise<any> {
    return UserModel.findByIdAndUpdate(contract.id, { ...contract });
};

function userDtoToModel(contract: UserDTO): any {
    const userDto = {
        name: contract.name,
        firstSurname: contract.firstSurname,
        secondSurname: contract.secondSurname,
        email: contract.email,
        phoneNumber: contract.phoneNumber,
        age: contract.age,
        photoUrl: contract.photoUrl,
        customRol: contract.customRol,
        isSystem: true,
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
            : null
    };
    return userDto;
}

const deleteUser = async function (id: string): Promise<any> {
    return UserModel.findByIdAndUpdate(id, { deleted: true });
};

const findById = async function (id: string): Promise<any> {
    return UserModel.findById(id)
        .where({ deleted: false })
        .populate('rol')
        .populate('accesess');
};

const deleteByIds = async function (ids: string[]): Promise<any> {
    const promises = ids.map((item) => deleteUser(item));
    return Promise.all(promises);
};

export {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    findById,
    deleteByIds,
    partialUpdateUser
};
