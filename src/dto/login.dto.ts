import { UserDTO } from './user.dto';

export interface LoginResponse extends UserDTO {
    token?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
