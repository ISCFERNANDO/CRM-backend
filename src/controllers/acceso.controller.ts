import { NextFunction, Request, Response } from 'express';
import { AccessDTO } from 'src/dto/access.dto';
import HttpException from '../common/http.exception';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import * as accessService from '../services/accesso.service';

const getAllAccess = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const data = await accessService.getAllAccess(next);
    responseHandler(res, Messages.OPERATION_OK, data);
};

const addAccess = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requestBody: AccessDTO = req.body;
    const data = await accessService.addAccess(requestBody, next);
    responseHandler(res, Messages.ADD_ACCESS_OK, data);
};

const updateAccess = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const requestBody: AccessDTO = req.body;
    requestBody.id = req.params.id;
    const data = await accessService.updateAccess(requestBody, next);
    responseHandler(res, Messages.UPDATE_ACCESS_OK, data);
};

const deleteAccess = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    const data = await accessService.deleteAccess(id, next);
    responseHandler(res, Messages.DELETE_ACCESS_OK, data);
};

const findById = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { id } = req.params;
    const data = await accessService.findAccessById(id, next);
    responseHandler(res, Messages.OPERATION_OK, data);
};

const deleteAccessess = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const ids: any = req.query.ids;
    if (!Array.isArray(ids)) {
        next(new HttpException(404, Messages.PARAM_NOT_ARRAY));
        return;
    }
    const data = await accessService.deleteAccessesByIds(ids, next);
    responseHandler(res, Messages.DELETE_ACCESS_OK, data);
};

export {
    getAllAccess,
    addAccess,
    updateAccess,
    deleteAccess,
    findById,
    deleteAccessess
};
