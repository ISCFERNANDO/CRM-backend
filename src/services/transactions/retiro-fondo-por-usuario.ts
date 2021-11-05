import { ICajaTransaction } from './caja-transaction.service';

export class RetiroFondoPorUsuarioTransaction extends ICajaTransaction {
    constructor() {
        super(false);
    }
}
