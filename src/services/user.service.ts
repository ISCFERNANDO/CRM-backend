import { NextFunction } from 'express';
import HttpException from '../common/http.exception';
import * as userRepository from '../repositories/user.repository';
import { Messages } from './../constants/messages';
import { AccessDTO } from './../dto/access.dto';
import { RolDTO } from './../dto/rol.dto';
import { UserDTO } from './../dto/user.dto';
import { findIfNotInIds } from './../repositories/accesso.repository';
import { mapAccess } from './accesso.service';

const getAllUsers = async function (
    next: NextFunction
): Promise<UserDTO[] | void> {
    try {
        const users = await userRepository.getAllUsers();
        return users.map((item) => mapUser(item));
    } catch (error) {
        next(new HttpException(500, Messages.GET_ROLLS_ERROR));
    }
};

const addUser = async function (
    contract: UserDTO,
    next: NextFunction
): Promise<UserDTO | void> {
    try {
        const data = await userRepository.addUser(contract);
        contract.id = data._id;
        return contract;
    } catch (error) {
        next(new HttpException(500, Messages.ADD_ROLL_ERROR));
    }
};

const updateUser = async function (
    contract: UserDTO,
    next: NextFunction
): Promise<UserDTO | void> {
    try {
        const data = await userRepository.updateUser(contract);
        if (!data) {
            next(new HttpException(404, Messages.ROLL_NOT_FOUND));
            return;
        }
        contract.id = data._id;
        return contract;
    } catch (error) {
        next(new HttpException(500, Messages.ADD_ROLL_ERROR));
    }
};

const findUserById = async function (
    id: string,
    next: NextFunction
): Promise<UserDTO | void> {
    try {
        const data = await userRepository.findById(id);
        const detailsUser: UserDTO = mapUser(data, true);
        if (detailsUser.customRol) {
            const accesses: AccessDTO[] = await getListAccesosQueNoPertenecenRol(
                detailsUser.accesess.map((item) => item.id)
            );
            detailsUser.accesess.push(...accesses);
        }
        return detailsUser;
    } catch (error) {
        next(new HttpException(404, Messages.ROLL_NOT_FOUND));
    }
};

async function getListAccesosQueNoPertenecenRol(
    ids: string[]
): Promise<AccessDTO[]> {
    const accesses = await findIfNotInIds(ids);
    return accesses.map(mapAccess).map((item: AccessDTO) => {
        item.active = false;
        return item;
    });
}

function mapUser(item: any, isDetail: boolean = false): UserDTO {
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
        imageUrl: item.imageUrl
    };
    if (isDetail) {
        if (item.customRol) data.accesess = item.accesess.map(mapAccess);
        else data.rol = mapRol(item.rol);
    }
    return data;
}

const deleteUser = async function (
    id: string,
    next: NextFunction
): Promise<boolean | void> {
    try {
        await userRepository.deleteUser(id);
        return true;
    } catch (error) {
        next(new HttpException(404, Messages.ACCESS_NOT_FOUND));
    }
};

const deleteUsersByIds = async function (
    ids: string[],
    next: NextFunction
): Promise<boolean | void> {
    try {
        await userRepository.deleteByIds(ids);
        return true;
    } catch (error) {
        next(new HttpException(404, Messages.ROLL_NOT_FOUND));
    }
};

const partialUpdateUser = async function (
    contract: UserDTO,
    next: NextFunction
): Promise<UserDTO | void> {
    try {
        const data = await userRepository.partialUpdateUser(contract);
        if (!data) {
            next(new HttpException(404, Messages.ROLL_NOT_FOUND));
            return;
        }
        contract.id = data._id;
        return contract;
    } catch (error) {
        next(new HttpException(500, Messages.ADD_ROLL_ERROR));
    }
};

function mapRol(item: any): RolDTO {
    return {
        id: item._id,
        name: item.name,
        description: item.description,
        active: item.active,
        isSystem: item.isSystem,
        accesess: []
    };
}

export {
    getAllUsers,
    addUser,
    findUserById,
    updateUser,
    deleteUser,
    deleteUsersByIds,
    partialUpdateUser
};
