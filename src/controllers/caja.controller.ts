import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { CajaDTO, IngresoEfectivoDTO } from './../dto/caja.dto';
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

    public async findAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const listOfCajas = await this.cajaService.findAll();
            responseHandler(res, Messages.OPERATION_OK, listOfCajas);
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
            const cajaId: string = req.params.id;
            const caja = await this.cajaService.findById(cajaId);
            responseHandler(res, Messages.OPERATION_OK, caja);
        } catch (error) {
            next(error);
        }
    }

    public async ingresoEfectivo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: IngresoEfectivoDTO = req.body;
            requestBody.cajaId = req.params.id;
            const data = await this.cajaService.ingresoEfectivo(requestBody);
            responseHandler(res, Messages.ADD_INGRESO_CAJA_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async retiroEfectivo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: IngresoEfectivoDTO = req.body;
            requestBody.cajaId = req.params.id;
            const data = await this.cajaService.retiroEfectivo(requestBody);
            responseHandler(res, Messages.ADD_INGRESO_CAJA_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
