import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { PrestamoDTO } from './../dto/prestamo.dto';
import { PrestamoService } from './../services/prestamo.service';

@Service()
export class PrestamoController {
    constructor(private prestamoService: PrestamoService) {}

    public async addPrestamo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: PrestamoDTO = req.body;
            const data = await this.prestamoService.addPrestamo(requestBody);
            responseHandler(res, Messages.ADD_PRESTAMO_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
