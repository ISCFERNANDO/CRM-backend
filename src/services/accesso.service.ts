import { NextFunction } from 'express';
import { AccessDTO } from 'src/dto/access.dto';
import HttpException from '../common/http.exception';
import * as accessRepository from '../repositories/accesso.repository';
import { Messages } from './../constants/messages';

const getAllAccess = async function (
    next: NextFunction
): Promise<AccessDTO[] | void> {
    try {
        const access = await accessRepository.getAllAccess();
        return access.map(mapAccess);
    } catch (error) {
        next(new HttpException(500, Messages.GET_ACCESS_ERROR));
    }
};

const addAccess = async function (
    contract: AccessDTO,
    next: NextFunction
): Promise<AccessDTO | void> {
    try {
        const data = await accessRepository.addAccess(contract);
        contract.id = data._id;
        return contract;
    } catch (error) {
        next(new HttpException(500, Messages.ADD_ACCESS_ERROR));
    }
};

const updateAccess = async function (
    contract: AccessDTO,
    next: NextFunction
): Promise<AccessDTO | void> {
    try {
        const data = await accessRepository.updateAccess(contract);
        if (!data) {
            next(new HttpException(404, Messages.ACCESS_NOT_FOUND));
            return;
        }
        contract.id = data._id;
        return contract;
    } catch (error) {
        next(new HttpException(404, Messages.ACCESS_NOT_FOUND));
    }
};

const deleteAccess = async function (
    id: string,
    next: NextFunction
): Promise<boolean | void> {
    try {
        await accessRepository.deleteAccess(id);
        return true;
    } catch (error) {
        next(new HttpException(404, Messages.ACCESS_NOT_FOUND));
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
        next(new HttpException(404, Messages.ACCESS_NOT_FOUND));
    }
};

function mapAccess(item: any): AccessDTO {
    return {
        id: item._id,
        name: item.name,
        route: item.route,
        description: item.description,
        active: item.active
    };
}

export { getAllAccess, addAccess, updateAccess, deleteAccess, findAccessById };
