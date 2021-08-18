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
        try {
            const data = await this.rollService.getAllRolls();
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async addRoll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: RolDTO = req.body;
            const data = await this.rollService.addRoll(requestBody);
            responseHandler(res, Messages.ADD_ROLL_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async updateRoll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: RolDTO = req.body;
            requestBody.id = req.params.id;
            const data = await this.rollService.updateRoll(requestBody);
            responseHandler(res, Messages.ADD_ROLL_OK, data);
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
            const data = await this.rollService.findRollById(id);
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async deleteRoll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.rollService.deleteRoll(id);
            responseHandler(res, Messages.DELETE_ROLL_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async deleteRolls(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const ids: string = req.query.ids as string;
            const items: string[] = ids.split(',').map((item) => item.trim());
            const data = await this.rollService.deleteRollsByIds(items);
            responseHandler(res, Messages.DELETE_ROLL_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async partialUpdate(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const requestBody: RolDTO = req.body;
            requestBody.id = req.params.id;
            const data = await this.rollService.partialUpdateRoll(requestBody);
            responseHandler(res, Messages.ADD_ROLL_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
