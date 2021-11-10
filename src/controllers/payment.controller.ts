import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { PaymentRequest } from '../dto/payment.dto';
import { PaymentService } from './../services/payment.service';

@Service()
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    async makePayment(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const reqBody: PaymentRequest = req.body;
            await this.paymentService.makePayment(reqBody);
            responseHandler(res, Messages.PAYMENT_OK, null);
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
}
