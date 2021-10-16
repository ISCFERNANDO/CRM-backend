import 'reflect-metadata';
import { Service } from 'typedi';
import { CurrencyModel, PaymentMethodModel, PlazoModel } from '../models';

export interface ICatalogRepository {
    getAllCurrency(): Promise<Array<any>>;
    getAllPlazosCredito(): Promise<Array<any>>;
    getAllPlazosPago(): Promise<Array<any>>;
}

@Service()
export class CatalogRepository implements ICatalogRepository {
    public getAllPlazosPago = (): Promise<any[]> =>
        PaymentMethodModel.where({ deleted: false });

    public getAllPlazosCredito = (): Promise<any[]> =>
        PlazoModel.where({ deleted: false });

    public getAllCurrency = (): Promise<Array<any>> =>
        CurrencyModel.where({ deleted: false }).sort({ name: 'asc' });
}
