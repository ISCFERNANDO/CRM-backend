import { NextFunction, Request, Response } from 'express';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import * as rollsService from '../services/rol.service';
import { RolDTO } from './../dto/rol.dto';

const getAllRolls = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const data = await rollsService.getAllRolls(next);
    responseHandler(res, Messages.OPERATION_OK, data);
};

const addRoll = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requestBody: RolDTO = req.body;
    const data = await rollsService.addRoll(requestBody, next);
    responseHandler(res, Messages.ADD_ROLL_OK, data);
};

const updateRoll = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requestBody: RolDTO = req.body;
    requestBody.id = req.params.id;
    const data = await rollsService.updateRoll(requestBody, next);
    responseHandler(res, Messages.ADD_ROLL_OK, data);
};

const findById = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    const data = await rollsService.findRollById(id, next);
    responseHandler(res, Messages.OPERATION_OK, data);
};

const deleteRoll = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    const data = await rollsService.deleteRoll(id, next);
    responseHandler(res, Messages.DELETE_ROLL_OK, data);
};

const deleteRolls = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const ids: string = req.query.ids as string;
    const items: string[] = ids.split(',').map((item) => item.trim());
    const data = await rollsService.deleteRollsByIds(items, next);
    responseHandler(res, Messages.DELETE_ROLL_OK, data);
};

export { getAllRolls, addRoll, findById, updateRoll, deleteRoll, deleteRolls };
