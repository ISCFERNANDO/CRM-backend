import { sign, verify } from 'jsonwebtoken';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { UserDTO } from './../dto/user.dto';
const secret = process.env.JWT_SECRET ?? '';

function createToken(user: UserDTO): string {
    return sign(user, secret, {
        expiresIn: '12h'
    });
}

function validateAndDecodeToken(token: string): any {
    try {
        const data: any = verify(token, secret, {
            complete: true
        });
        return data;
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
