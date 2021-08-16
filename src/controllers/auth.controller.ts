import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { LoginRequest } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';

@Service()
export class AuthController {
    constructor(private authService: AuthService) {}

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const reqBody: LoginRequest = req.body;
        const data = await this.authService.login(reqBody, next);
        responseHandler(res, Messages.OPERATION_OK, data);
    }
}
