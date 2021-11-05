export interface CajaDTO {
    id: string;
    name: string;
    balance: number;
    transactions?: Array<TransactionDTO>;
    active: boolean;
    deleted: boolean;
}

export interface IngresoEfectivoDTO {
    cajaId: string;
    transactionDate: string;
    description: string;
    amountTransaction: number;
    userTransaction?: string;
}

export interface TransactionDTO {
    id?: string;
    typeTransaction: string;
    userTransaction?: string;
    transactionDate: string;
    description: string;
    amountTransaction: number;
    confirmed: boolean;
    active?: boolean;
    deleted?: boolean;
}

export interface AddTransactionDTO {
    caja: string;
    typeTransaction: string;
    userTransaction: string;
    description: string;
    amountTransaction: number;
}
