import 'reflect-metadata';
import { Service } from 'typedi';
import { TransactionCajaModel } from '../models';
import { TransactionDTO } from './../dto/caja.dto';

export interface ITransactionRepository {
    addTransaction(transaction: TransactionDTO): Promise<any>;
}

@Service()
export class TransactionRepository implements ITransactionRepository {
    public addTransaction = (transaction: TransactionDTO): Promise<any> => {
        transaction.active = true;
        transaction.deleted = false;
        return TransactionCajaModel.create(
            this.transactionDtoToModel(transaction)
        );
    };

    private transactionDtoToModel(contract: TransactionDTO): any {
        return {
            typeTransaction: contract.typeTransaction,
            transactionDate: contract.transactionDate,
            description: contract.description,
            transactionAmount: contract.amountTransaction,
            confirmed: contract.confirmed,
            active: contract.active,
            deleted: contract.deleted
        };
    }
}
