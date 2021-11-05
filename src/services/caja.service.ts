import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { CajaRepository } from '../repositories/caja.repository';
import { HttpStatus } from './../constants/http-status';
import { Messages } from './../constants/messages';
import { CajaDTO } from './../dto/caja.dto';

@Service()
export class CajaService {
    constructor(private cajaRepository: CajaRepository) {}

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

    private mapCaja(caja: any): CajaDTO {
        return {
            id: caja._id,
            name: caja.name,
            balance: caja.balance,
            transactions: [],
            active: caja.active,
            deleted: caja.deleted
        };
    }
}
