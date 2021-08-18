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
        try {
            const data = await this.usersService.getAllUsers();
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    async addUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: UserDTO = req.body;
            const data = await this.usersService.addUser(requestBody);
            responseHandler(res, Messages.ADD_USER_OK, data);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: UserDTO = req.body;
            requestBody.id = req.params.id;
            const data = await this.usersService.updateUser(requestBody);
            responseHandler(res, Messages.UPDATE_USER_OK, data);
        } catch (error) {
            next(error);
        }
    }

    async findById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.usersService.findUserById(id);
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.usersService.deleteUser(id);
            responseHandler(res, Messages.DELETE_USER_OK, data);
        } catch (error) {
            next(error);
        }
    }

    async deleteUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const ids: string = req.query.ids as string;
            const items: string[] = ids.split(',').map((item) => item.trim());
            const data = await this.usersService.deleteUsersByIds(items);
            responseHandler(res, Messages.DELETE_USER_OK, data);
        } catch (error) {
            next(error);
        }
    }

    async partialUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const requestBody: UserDTO = req.body;
            requestBody.id = req.params.id;
            const data = await this.usersService.partialUpdateUser(requestBody);
            responseHandler(res, Messages.ADD_USER_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
