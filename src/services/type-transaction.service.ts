import { Service } from 'typedi';
import { TypeTransactionDTO } from './../dto/type-transaction.dto';
import { TypeTransactionRepository } from './../repositories/type-transaction.repository';

@Service()
export class TypeTransactionService {
    constructor(private typeTransactionRepository: TypeTransactionRepository) {}

    async getAllTypesTransaction(): Promise<TypeTransactionDTO[]> {
        const listOfTypesTransaction = await this.typeTransactionRepository.getAllTypesTransaction();
        return listOfTypesTransaction.map(this.mapTypeTransaction);
    }

    async findTypeTransacionByKey(key: string): Promise<TypeTransactionDTO> {
        const typeTransaction = await this.typeTransactionRepository.findTypeTransactionByKey(
            key
        );
        return this.mapTypeTransaction(typeTransaction);
    }

    private mapTypeTransaction(item: any): TypeTransactionDTO {
        return {
            id: item._id,
            key: item.key,
            name: item.name,
            deleted: item.deleted,
            active: item.active,
            isSystem: item.isSystem
        };
    }
}
