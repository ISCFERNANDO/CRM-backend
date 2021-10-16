import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { CatalogService } from '../services/catalog.service';

@Service()
export class CatalogController {
    constructor(private catalogService: CatalogService) {}

    async getAllCurrency(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const listOfCurrency = await this.catalogService.findAllCurrency();
            responseHandler(res, Messages.OPERATION_OK, listOfCurrency);
        } catch (error) {
            next(error);
        }
    }

    async getAllPlazosCredito(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const listOfPlazos = await this.catalogService.getAllPlazosCredito();
            responseHandler(res, Messages.OPERATION_OK, listOfPlazos);
        } catch (error) {
            next(error);
        }
    }

    async getAllPlazosPago(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const listOfPlazos = await this.catalogService.getAllPlazosPago();
            responseHandler(res, Messages.OPERATION_OK, listOfPlazos);
        } catch (error) {
            next(error);
        }
    }
}
