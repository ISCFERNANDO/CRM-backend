import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from '../constants/messages';
import { InterestService } from './../services/interest.service';

@Service()
export class InterestController {
    constructor(private interestService: InterestService) {}

    async getAllInterests(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const listOfInterest = await this.interestService.findAllInterest();
            responseHandler(res, Messages.OPERATION_OK, listOfInterest);
        } catch (error) {
            next(error);
        }
    }
}
