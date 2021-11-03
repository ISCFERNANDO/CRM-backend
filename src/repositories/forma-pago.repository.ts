import 'reflect-metadata';
import { Service } from 'typedi';
import { PaymentMethodModel } from '../models';

export interface IFormaPagoRepository {
    getAllFormasPago(): Promise<Array<any>>;
    findFormaPagoById(id: string): Promise<any>;
}

@Service()
export class FormaPagoRepository implements IFormaPagoRepository {
    public getAllFormasPago = (): Promise<any[]> =>
        PaymentMethodModel.where({ deleted: false });

    public findFormaPagoById = (id: string): Promise<any> =>
        PaymentMethodModel.findById(id);
}
