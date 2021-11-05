import { ICajaTransaction } from './caja-transaction.service';

export class RetiroFondoPorPrestanoTransaction extends ICajaTransaction {
    constructor() {
        super(false);
    }
}
