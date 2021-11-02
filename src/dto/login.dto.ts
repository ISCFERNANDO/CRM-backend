import { AccessDTO } from './access.dto';
import { PersonDTO } from './person.dto';
import { RolDTO } from './rol.dto';

export interface LoginResponse extends PersonDTO {
    id: string;
    phoneNumber?: string;
    photoUrl?: string;
    customRol: boolean;
    rol: RolDTO | null;
    accesess: AccessDTO[];
    imageUrl: string;
    token?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
