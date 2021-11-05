import { Container, Service } from 'typedi';
import { TransactionDTO } from '../../dto/caja.dto';
import { TransactionRepository } from '../../repositories/transaction.respository';
import { CajaService } from '../caja.service';
import { CajaDTO } from './../../dto/caja.dto';

export abstract class ICajaTransaction {
    protected isIngreso: boolean;
    private cajaService: CajaService = Container.get(CajaService);
    private transactionCaja: TransactionRepository = Container.get(
        TransactionRepository
    );

    constructor(isIngreso: boolean) {
        this.isIngreso = isIngreso;
    }

    async registerTransaction(transaction: TransactionDTO, cajaId: string) {
        const tran = await this.transactionCaja.addTransaction(transaction);
        return this.cajaService.updateBalance(
            cajaId,
            tran._id,
            transaction.amountTransaction,
            this.isIngreso
        );
    }
}

@Service()
export class CajaTransactionService {
    registerTransaction = (
        transaction: TransactionDTO,
        cajaId: string,
        tipoTransaction: ICajaTransaction
    ): Promise<CajaDTO> =>
        tipoTransaction.registerTransaction(transaction, cajaId);
}
