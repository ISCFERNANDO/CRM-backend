import { NextFunction } from 'express';
import HttpException from '../common/http.exception';
import * as rollRepository from '../repositories/rol.repository';
import { Messages } from './../constants/messages';
import { AccessDTO } from './../dto/access.dto';
import { RolDTO } from './../dto/rol.dto';
import { findIfNotInIds } from './../repositories/accesso.repository';
import { mapAccess } from './accesso.service';

const getAllRolls = async function (
    next: NextFunction
): Promise<RolDTO[] | void> {
    try {
        const rolls = await rollRepository.getAllRol();
        return rolls.map((item) => mapRoll(item));
    } catch (error) {
        next(new HttpException(500, Messages.GET_ROLLS_ERROR));
    }
};

const addRoll = async function (
    contract: RolDTO,
    next: NextFunction
): Promise<RolDTO | void> {
    try {
        const data = await rollRepository.addRol(contract);
        contract.id = data._id;
        return contract;
    } catch (error) {
        next(new HttpException(500, Messages.ADD_ROLL_ERROR));
    }
};

const updateRoll = async function (
    contract: RolDTO,
    next: NextFunction
): Promise<RolDTO | void> {
    try {
        const data = await rollRepository.updateRol(contract);
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

const findRollById = async function (
    id: string,
    next: NextFunction
): Promise<RolDTO | void> {
    try {
        const data = await rollRepository.findById(id);
        const detailsRoll: RolDTO = mapRoll(data, true);
        const accesses: AccessDTO[] = await getListAccesosQueNoPertenecenRol(
            detailsRoll.accesess.map((item) => item.id)
        );
        detailsRoll.accesess.push(...accesses);
        return detailsRoll;
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

function mapRoll(item: any, isDetail: boolean = false): RolDTO {
    const data: RolDTO = {
        id: item._id,
        name: item.name,
        description: item.description,
        isSystem: item.isSystem,
        accesess: [],
        active: item.active
    };
    if (isDetail && item.accesess) {
        data.accesess = item.accesess.map(mapAccess);
    }
    return data;
}

const deleteRoll = async function (
    id: string,
    next: NextFunction
): Promise<boolean | void> {
    try {
        await rollRepository.deleteRol(id);
        return true;
    } catch (error) {
        next(new HttpException(404, Messages.ACCESS_NOT_FOUND));
    }
};

const deleteRollsByIds = async function (
    ids: string[],
    next: NextFunction
): Promise<boolean | void> {
    try {
        await rollRepository.deleteByIds(ids);
        return true;
    } catch (error) {
        next(new HttpException(404, Messages.ROLL_NOT_FOUND));
    }
};

const partialUpdateRoll = async function (
    contract: RolDTO,
    next: NextFunction
): Promise<RolDTO | void> {
    try {
        const data = await rollRepository.partialUpdateRol(contract);
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

export {
    getAllRolls,
    addRoll,
    findRollById,
    updateRoll,
    deleteRoll,
    deleteRollsByIds,
    partialUpdateRoll
};
