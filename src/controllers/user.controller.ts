import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { UserService } from '../services/user.service';
import { UserDTO } from './../dto/user.dto';

@Service()
export class UserController {
    constructor(private usersService: UserService) {}

    async getAllUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const data = await this.usersService.getAllUsers(next);
        responseHandler(res, Messages.OPERATION_OK, data);
    }

    async addUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const requestBody: UserDTO = req.body;
        const data = await this.usersService.addUser(requestBody, next);
        responseHandler(res, Messages.ADD_USER_OK, data);
    }

    async updateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const requestBody: UserDTO = req.body;
        requestBody.id = req.params.id;
        const data = await this.usersService.updateUser(requestBody, next);
        responseHandler(res, Messages.UPDATE_USER_OK, data);
    }

    async findById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { id } = req.params;
        const data = await this.usersService.findUserById(id, next);
        responseHandler(res, Messages.OPERATION_OK, data);
    }

    async deleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { id } = req.params;
        const data = await this.usersService.deleteUser(id, next);
        responseHandler(res, Messages.DELETE_USER_OK, data);
    }

    async deleteUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const ids: string = req.query.ids as string;
        const items: string[] = ids.split(',').map((item) => item.trim());
        const data = await this.usersService.deleteUsersByIds(items, next);
        responseHandler(res, Messages.DELETE_USER_OK, data);
    }

    async partialUpdate(req: Request, res: Response, next: NextFunction) {
        const requestBody: UserDTO = req.body;
        requestBody.id = req.params.id;
        const data = await this.usersService.partialUpdateUser(
            requestBody,
            next
        );
        responseHandler(res, Messages.ADD_USER_OK, data);
    }
}
