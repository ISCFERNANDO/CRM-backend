import 'reflect-metadata';
import { Service } from 'typedi';
import { PaymentMethodInterestModel } from '../models';

export interface IInterestRepository {
    getAllInterests(): Promise<Array<any>>;
}

@Service()
export class InterestRepository implements IInterestRepository {
    public getAllInterests = (): Promise<any[]> =>
        PaymentMethodInterestModel.where({ deleted: false });
}
