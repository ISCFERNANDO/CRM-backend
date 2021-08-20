import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { AddressService } from './../services/address.service';

@Service()
export class AddressController {
    constructor(private addressService: AddressService) {}

    async findAddressByCp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const cp: string = req.query.cp as string;
            const data = await this.addressService.getAddressByCp(cp);
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
