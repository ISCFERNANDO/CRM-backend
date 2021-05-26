import { AccessDTO } from './access.dto';
import { RolDTO } from './rol.dto';

export interface UserDTO {
    id: string;
    name: string;
    firstSurname: string;
    secondSurname?: string;
    email: string;
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
