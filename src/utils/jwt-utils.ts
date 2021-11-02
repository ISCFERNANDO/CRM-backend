import { LoginResponse } from '@/dto/login.dto';
import { sign, verify } from 'jsonwebtoken';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
const secret = process.env.JWT_SECRET ?? '';

function createToken(user: LoginResponse): string {
    return sign(
        {
            id: user.id,
            name: user.name,
            firstSurname: user.firstSurname,
            secondSurname: user.secondSurname
        },
        secret,
        {
            expiresIn: '12h'
        }
    );
}

function validateAndDecodeToken(token: string): any {
    try {
        return verify(token, secret, {
            complete: true
        });
    } catch (error) {
        const message = mapJwtError(error);
        throw new HttpException(HttpStatus.UNAUTHORIZED, message, error);
    }
}

function mapJwtError(error: any): string {
    switch (error.name) {
        case 'TokenExpiredError':
            return 'El token ha caducado';
        case 'JsonWebTokenError':
            return 'Ocurrió un error al decodificar el token';
        case 'NotBeforeError':
            return 'La hora actual es anterior a la reclamación';
        default:
            return '';
    }
}
export { createToken, validateAndDecodeToken };
