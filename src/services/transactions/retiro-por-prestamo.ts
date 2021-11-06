import { ICajaTransaction } from './caja-transaction.service';

export class RetiroFondoPorPrestamoTransaction extends ICajaTransaction {
    constructor() {
        super(false);
    }
}
