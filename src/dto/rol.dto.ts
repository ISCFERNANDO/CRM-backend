import { AccessDTO } from 'src/dto/access.dto';

export interface RolDTO {
    id?: string;
    name: string;
    description?: string;
    active: boolean;
    isSystem: boolean;
    accesess: AccessDTO[];
}
