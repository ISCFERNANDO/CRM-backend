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
        const data = await this.accessService.getAllAccess(next);
        responseHandler(res, Messages.OPERATION_OK, data);
    }

    public async addAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const requestBody: AccessDTO = req.body;
        const data = await this.accessService.addAccess(requestBody, next);
        responseHandler(res, Messages.ADD_ACCESS_OK, data);
    }

    public async updateAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const requestBody: AccessDTO = req.body;
        requestBody.id = req.params.id;
        const data = await this.accessService.updateAccess(requestBody, next);
        responseHandler(res, Messages.UPDATE_ACCESS_OK, data);
    }

    public async deleteAccess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { id } = req.params;
        const data = await this.accessService.deleteAccess(id, next);
        responseHandler(res, Messages.DELETE_ACCESS_OK, data);
    }

    public async findById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { id } = req.params;
        const data = await this.accessService.findAccessById(id, next);
        responseHandler(res, Messages.OPERATION_OK, data);
    }

    public async deleteAccessess(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const ids: string = req.query.ids as string;
        const items: string[] = ids.split(',').map((item) => item.trim());
        const data = await this.accessService.deleteAccessesByIds(items, next);
        responseHandler(res, Messages.DELETE_ACCESS_OK, data);
    }
}
