import { NextFunction } from 'express';
import { AccessDTO } from 'src/dto/access.dto';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import * as accessRepository from '../repositories/accesso.repository';
import { Messages } from './../constants/messages';

const getAllAccess = async function (
    next: NextFunction
): Promise<AccessDTO[] | void> {
    try {
        const access = await accessRepository.getAllAccess();
        return access.map(mapAccess);
    } catch (error) {
        next(
            new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                Messages.GET_ACCESS_ERROR
            )
        );
    }
};

const addAccess = async function (
    contract: AccessDTO,
    next: NextFunction
): Promise<AccessDTO | void> {
    try {
        if (await checkIfExistAccessName(contract.name)) {
            next(new HttpException(HttpStatus.CONFLICT, Messages.ACCESS_EXIST));
            return;
        }
        const data = await accessRepository.addAccess(contract);
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
};

const updateAccess = async function (
    contract: AccessDTO,
    next: NextFunction
): Promise<AccessDTO | void> {
    try {
        if (
            await accessRepository.checkIfExistAccessName(
                contract.name,
                contract.id
            )
        ) {
            next(new HttpException(HttpStatus.CONFLICT, Messages.ACCESS_EXIST));
            return;
        }
        const data = await accessRepository.updateAccess(contract);
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
            new HttpException(HttpStatus.NOT_FOUND, Messages.ACCESS_NOT_FOUND)
        );
    }
};

function checkIfExistAccessName(name: string, id?: string) {
    return accessRepository.checkIfExistAccessName(name, id);
}

const deleteAccess = async function (
    id: string,
    next: NextFunction
): Promise<boolean | void> {
    try {
        const isSystem = await accessRepository.isSystem(id);
        if (isSystem) {
            next(
                new HttpException(
                    HttpStatus.CONFLICT,
                    Messages.ACCESS_NOT_REMOVABLE
                )
            );
            return;
        }
        await accessRepository.deleteAccess(id);
        return true;
    } catch (error) {
        next(
            new HttpException(HttpStatus.NOT_FOUND, Messages.ACCESS_NOT_FOUND)
        );
    }
};

const findAccessById = async function (
    id: string,
    next: NextFunction
): Promise<AccessDTO | void> {
    try {
        const data = await accessRepository.findById(id);
        return mapAccess(data);
    } catch (error) {
        next(
            new HttpException(HttpStatus.NOT_FOUND, Messages.ACCESS_NOT_FOUND)
        );
    }
};

const deleteAccessesByIds = async function (
    ids: string[],
    next: NextFunction
): Promise<boolean | void> {
    try {
        if (await checkIfAnyIsFromSystem(ids)) {
            next(
                new HttpException(
                    HttpStatus.CONFLICT,
                    Messages.ACCESS_NOT_REMOVABLE
                )
            );
            return;
        }
        await accessRepository.deleteByIds(ids);
        return true;
    } catch (error) {
        console.log(error);
        next(
            new HttpException(HttpStatus.NOT_FOUND, Messages.ACCESS_NOT_FOUND)
        );
    }
};

async function checkIfAnyIsFromSystem(ids: string[]): Promise<boolean> {
    for (let index = 0; index < ids.length; index++) {
        if (await accessRepository.isSystem(ids[index])) {
            return true;
        }
    }
    return false;
}

function mapAccess(item: any): AccessDTO {
    return {
        id: item._id,
        name: item.name,
        route: item.route,
        description: item.description,
        active: item.active,
        isSystem: item.isSystem
    };
}

export {
    getAllAccess,
    addAccess,
    updateAccess,
    deleteAccess,
    findAccessById,
    deleteAccessesByIds,
    mapAccess
};
