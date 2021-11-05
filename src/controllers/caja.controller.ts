import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { CajaDTO } from './../dto/caja.dto';
import { CajaService } from './../services/caja.service';

@Service()
export class CajaController {
    constructor(private cajaService: CajaService) {}

    public async addCaja(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: CajaDTO = req.body;
            const data = await this.cajaService.addCaja(requestBody);
            responseHandler(res, Messages.ADD_CAJA_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
