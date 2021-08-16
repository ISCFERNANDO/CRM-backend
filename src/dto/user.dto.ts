import { AccessDTO } from './access.dto';
import { PersonDTO } from './person.dto';
import { RolDTO } from './rol.dto';

export interface UserDTO extends PersonDTO {
    id: string;
    phoneNumber?: string;
    age: number;
    photoUrl?: string;
    isSystem: boolean;
    customRol: boolean;
    rol: RolDTO | null;
    accesess: AccessDTO[];
    password: string;
    active: boolean;
    imageUrl: string;
}
