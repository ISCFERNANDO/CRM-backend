import { ICajaTransaction } from './caja-transaction.service';

export class IngresoFondoPorPagoPrestamoTransaction extends ICajaTransaction {
    constructor() {
        super(true);
    }
}
