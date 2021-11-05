import 'reflect-metadata';
import { Service } from 'typedi';
import { TypeTransactionModel } from '../models';

export interface ITypeTransactionRepository {
    getAllTypesTransaction(): Promise<Array<any>>;
    findTypeTransactionByKey(key: string): Promise<any>;
}

@Service()
export class TypeTransactionRepository implements ITypeTransactionRepository {
    public getAllTypesTransaction = (): Promise<Array<any>> =>
        TypeTransactionModel.where({ deleted: false });

    public findTypeTransactionByKey = (key: string): Promise<any> =>
        TypeTransactionModel.findOne({ key });
}
