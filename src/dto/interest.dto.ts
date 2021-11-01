import { CatalogDTO } from './catalog.dto';

export interface InterestDTO extends CatalogDTO {
    paymentMethodId: string;
    porcentajeInterest: number;
    porcentajeInteresMoratorio: number;
}
