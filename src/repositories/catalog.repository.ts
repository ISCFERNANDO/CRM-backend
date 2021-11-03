import 'reflect-metadata';
import { Service } from 'typedi';
import { CurrencyModel } from '../models';

export interface ICatalogRepository {
    getAllCurrency(): Promise<Array<any>>;
}

@Service()
export class CatalogRepository implements ICatalogRepository {
    public getAllCurrency = (): Promise<Array<any>> =>
        CurrencyModel.where({ deleted: false }).sort({ name: 'asc' });
}
