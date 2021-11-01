import { Service } from 'typedi';
import { InterestDTO } from './../dto/interest.dto';
import { InterestRepository } from './../repositories/interest.repository';

@Service()
export class InterestService {
    constructor(private interestRepository: InterestRepository) {}

    async findAllInterest(): Promise<InterestDTO[]> {
        const listOfInterest = await this.interestRepository.getAllInterests();
        return listOfInterest.map(this.mapInterest);
    }

    private mapInterest(data: any): InterestDTO {
        return {
            id: data.id,
            paymentMethodId: data.paymentMethod,
            name: data.name,
            porcentajeInterest: data.monthlyInterest,
            porcentajeInteresMoratorio: data.moratorioInterest,
            active: data.active,
            isSystem: data.isSystem
        };
    }
}
