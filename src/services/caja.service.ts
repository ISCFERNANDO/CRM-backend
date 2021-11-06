import { TypeTransactionDTO } from '@/dto/type-transaction.dto';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { CajaRepository } from '../repositories/caja.repository';
import { HttpStatus } from './../constants/http-status';
import { Messages } from './../constants/messages';
import { CajaDTO, IngresoEfectivoDTO } from './../dto/caja.dto';
import {
    CajaTransactionService,
    ICajaTransaction
} from './transactions/caja-transaction.service';
import { IngresoFondoTransaction } from './transactions/ingreso-fondo';
import { IngresoFondoPorPagoPrestamoTransaction } from './transactions/ingreso-porpago-prestamo';
import { RetiroFondoPorUsuarioTransaction } from './transactions/retiro-fondo-por-usuario';
import { RetiroFondoPorPrestamoTransaction } from './transactions/retiro-por-prestamo';
import { TypeTransactionService } from './type-transaction.service';

@Service()
export class CajaService {
    constructor(
        private cajaRepository: CajaRepository,
        private cajaTransactionService: CajaTransactionService,
        private typeTransactionService: TypeTransactionService
    ) {}

    async addCaja(caja: CajaDTO): Promise<CajaDTO> {
        if (await this.cajaRepository.findCajaByName(caja.name)) {
            throw new HttpException(HttpStatus.CONFLICT, Messages.CAJA_EXIST);
        }
        caja.balance = caja.balance ?? 0;
        caja.transactions = [];
        caja.deleted = false;
        const newCaja = await this.cajaRepository.addCaja(caja);
        caja.id = newCaja._id;
        return caja;
    }

    async findAll(): Promise<Array<CajaDTO>> {
        const listOfCajas = await this.cajaRepository.findAll();
        return listOfCajas.map((item) => this.mapCaja(item));
    }

    async findById(id: string): Promise<CajaDTO> {
        const caja = await this.cajaRepository.findCajaById(id);
        return this.mapCaja(caja, true);
    }

    ingresoEfectivo = (ingreso: IngresoEfectivoDTO): Promise<CajaDTO> =>
        this.executeTransaction(
            ingreso,
            'INGRESO_FONDO',
            new IngresoFondoTransaction()
        );

    retiroEfectivo = (ingreso: IngresoEfectivoDTO): Promise<CajaDTO> =>
        this.executeTransaction(
            ingreso,
            'RETIRO_POR_USUARIO',
            new RetiroFondoPorUsuarioTransaction()
        );

    retiroEfectivoPorPrestamo = (
        ingreso: IngresoEfectivoDTO
    ): Promise<CajaDTO> =>
        this.executeTransaction(
            ingreso,
            'RETIRO_POR_PRESTAMO',
            new RetiroFondoPorPrestamoTransaction()
        );

    ingresoEfectivoPorPagoPrestamo = (
        ingreso: IngresoEfectivoDTO
    ): Promise<CajaDTO> =>
        this.executeTransaction(
            ingreso,
            'INGRESO_POR_PAGO_DE_PRESTAMO',
            new IngresoFondoPorPagoPrestamoTransaction()
        );

    private async executeTransaction(
        ingreso: IngresoEfectivoDTO,
        typeTransactionKey: string,
        transaction: ICajaTransaction
    ) {
        const typeTransaction: TypeTransactionDTO = await this.typeTransactionService.findTypeTransacionByKey(
            typeTransactionKey
        );
        return this.cajaTransactionService.registerTransaction(
            {
                amountTransaction: ingreso.amountTransaction,
                typeTransaction: typeTransaction.id,
                confirmed: true,
                description: ingreso.description,
                transactionDate: ingreso.transactionDate
            },
            ingreso.cajaId,
            transaction
        );
    }

    async updateBalance(
        cajaId: string,
        transactionId: string,
        amount: number,
        isIngreso: boolean
    ): Promise<CajaDTO> {
        const caja: any = await this.cajaRepository.findCajaById(cajaId);
        caja.balance = isIngreso
            ? caja.balance + amount
            : caja.balance - amount;
        caja.transactions?.push(transactionId);
        return this.cajaRepository.updateCaja(cajaId, {
            balance: caja.balance,
            transactions: caja.transactions
        });
    }

    async findCajaByName(name: string): Promise<CajaDTO> {
        const caja = await this.cajaRepository.findCajaByName(name);
        if (!caja) {
            throw new HttpException(
                HttpStatus.NOT_FOUND,
                Messages.CAJA_NO_EXIST
            );
        }
        return this.mapCaja(caja);
    }

    private mapCaja(item: any, details?: boolean): CajaDTO {
        console.log('transactions => ', item.transactions[0]);
        const caja: CajaDTO = {
            id: item._id,
            name: item.name,
            balance: item.balance,
            transactions: [],
            active: item.active,
            deleted: item.deleted
        };
        if (details) {
            caja.transactions = item.transactions.map((t: any) => {
                return {
                    id: t._id,
                    typeTransaction: t.typeTransaction.name,
                    transactionDate: t.transactionDate,
                    description: t.description,
                    amountTransaction: t.transactionAmount,
                    confirmed: t.confirmed,
                    active: t.active,
                    deleted: t.deleted
                };
            });
        }
        return caja;
    }
}
