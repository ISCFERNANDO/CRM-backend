import { NextFunction, Request, Response } from 'express';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { LoginRequest } from '../dto/login.dto';
import * as authService from '../services/auth.service';

const login = async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const reqBody: LoginRequest = req.body;
    const data = await authService.login(reqBody, next);
    responseHandler(res, Messages.OPERATION_OK, data);
};

export { login };
