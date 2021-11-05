import { ICajaTransaction } from './caja-transaction.service';

export class IngresoFondoTransaction extends ICajaTransaction {
    constructor() {
        super(true);
    }
}
