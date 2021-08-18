import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { CustomerService } from '../services/customer.service';
import { CustomerDTO } from './../dto/customer.dto';

@Service()
export class CustomerController {
    constructor(private customerService: CustomerService) {}

    public async getAllCustomers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const data = await this.customerService.getAllCustomers();
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async addCustomer(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: CustomerDTO = req.body;
            const data = await this.customerService.addCustomer(requestBody);
            responseHandler(res, Messages.ADD_CUSTOMER_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async updateCustomer(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const requestBody: CustomerDTO = req.body;
            requestBody.id = req.params.id;
            const data = await this.customerService.updateCustomer(requestBody);
            responseHandler(res, Messages.UPDATE_CUSTOMER_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async deleteCustomer(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            const data = await this.customerService.deleteCustomer(id);
            responseHandler(res, Messages.DELETE_CUSTOMER_OK, data);
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
            const data = await this.customerService.findById(id);
            responseHandler(res, Messages.OPERATION_OK, data);
        } catch (error) {
            next(error);
        }
    }

    public async deleteCustomers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const ids: string = req.query.ids as string;
            const items: string[] = ids.split(',').map((item) => item.trim());
            const data = await this.customerService.deleteByIds(items);
            responseHandler(res, Messages.DELETE_CUSTOMER_OK, data);
        } catch (error) {
            next(error);
        }
    }

    async partialUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const requestBody: CustomerDTO = req.body;
            requestBody.id = req.params.id;
            const data = await this.customerService.partialUpdateCustomer(
                requestBody
            );
            responseHandler(res, Messages.UPDATE_CUSTOMER_OK, data);
        } catch (error) {
            next(error);
        }
    }
}
