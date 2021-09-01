import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { AccessDTO } from 'src/dto/access.dto';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { AccessoService } from '../services/accesso.service';

@Service()
export class AccessoController {
    constructor(private accessService: AccessoService) {}

    public async getAllAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = await this.accessService.getAllAccess();
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async addAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: AccessDTO = req.body;
            const data = await this.accessService.addAccess(requestBody);
            responseHandler(res, Messages.ADD_ACCESS_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async updateAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: AccessDTO = req.body;
            requestBody.id = parseInt(req.params.id);
            const data = await this.accessService.updateAccess(requestBody);
            responseHandler(res, Messages.UPDATE_ACCESS_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async deleteAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.accessService.deleteAccess(parseInt(id));
            responseHandler(res, Messages.DELETE_ACCESS_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async findById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.accessService.findAccessById(parseInt(id));
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async deleteAccessess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const ids: string = req.query.ids as string;
            const items: number[] = ids
                .split(',')
                .map((item) => parseInt(item.trim()));
            const data = await this.accessService.deleteAccessesByIds(items);
            responseHandler(res, Messages.DELETE_ACCESS_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
