import { NextFunction, Request, Response } from 'express';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import * as usersService from '../services/user.service';
import { UserDTO } from './../dto/user.dto';

const getAllUsers = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const data = await usersService.getAllUsers(next);
    responseHandler(res, Messages.OPERATION_OK, data);
};

const addUser = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requestBody: UserDTO = req.body;
    const data = await usersService.addUser(requestBody, next);
    responseHandler(res, Messages.ADD_USER_OK, data);
};

const updateUser = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requestBody: UserDTO = req.body;
    requestBody.id = req.params.id;
    const data = await usersService.updateUser(requestBody, next);
    responseHandler(res, Messages.UPDATE_USER_OK, data);
};

const findById = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    const data = await usersService.findUserById(id, next);
    responseHandler(res, Messages.OPERATION_OK, data);
};

const deleteUser = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    const data = await usersService.deleteUser(id, next);
    responseHandler(res, Messages.DELETE_USER_OK, data);
};

const deleteUsers = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const ids: string = req.query.ids as string;
    const items: string[] = ids.split(',').map((item) => item.trim());
    const data = await usersService.deleteUsersByIds(items, next);
    responseHandler(res, Messages.DELETE_USER_OK, data);
};

const partialUpdate = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    const requestBody: UserDTO = req.body;
    requestBody.id = req.params.id;
    const data = await usersService.partialUpdateUser(requestBody, next);
    responseHandler(res, Messages.ADD_USER_OK, data);
};

export {
    getAllUsers,
    addUser,
    findById,
    updateUser,
    deleteUser,
    deleteUsers,
    partialUpdate
};
