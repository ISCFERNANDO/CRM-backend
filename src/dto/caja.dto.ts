export interface CajaDTO {
    id: string;
    name: string;
    balance: number;
    transactions?: Array<TransactionDTO>;
    active: boolean;
    deleted: boolean;
}

export interface TransactionDTO {
    id: string;
    typeTransaction: string;
    userTransaction: string;
    description: string;
    amountTransaction: number;
    confirmed: boolean;
    active: boolean;
    deleted: boolean;
}
