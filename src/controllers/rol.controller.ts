import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { RolDTO } from './../dto/rol.dto';
import { RollService } from './../services/rol.service';

@Service()
export class RollController {
    constructor(private rollService: RollService) {}

    public async getAllRolls(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const data = await this.rollService.getAllRolls(next);
        responseHandler(res, Messages.OPERATION_OK, data);
    }

    public async addRoll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const requestBody: RolDTO = req.body;
        const data = await this.rollService.addRoll(requestBody, next);
        responseHandler(res, Messages.ADD_ROLL_OK, data);
    }

    public async updateRoll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const requestBody: RolDTO = req.body;
        requestBody.id = req.params.id;
        const data = await this.rollService.updateRoll(requestBody, next);
        responseHandler(res, Messages.ADD_ROLL_OK, data);
    }

    public async findById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { id } = req.params;
        const data = await this.rollService.findRollById(id, next);
        responseHandler(res, Messages.OPERATION_OK, data);
    }

    public async deleteRoll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { id } = req.params;
        const data = await this.rollService.deleteRoll(id, next);
        responseHandler(res, Messages.DELETE_ROLL_OK, data);
    }

    public async deleteRolls(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const ids: string = req.query.ids as string;
        const items: string[] = ids.split(',').map((item) => item.trim());
        const data = await this.rollService.deleteRollsByIds(items, next);
        responseHandler(res, Messages.DELETE_ROLL_OK, data);
    }

    public async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const requestBody: RolDTO = req.body;
        requestBody.id = req.params.id;
        const data = await this.rollService.partialUpdateRoll(
            requestBody,
            next
        );
        responseHandler(res, Messages.ADD_ROLL_OK, data);
    }
}
