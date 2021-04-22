import { sign } from 'jsonwebtoken';
import { UserDTO } from './../dto/user.dto';

function createToken(user: UserDTO): string {
    const secret = process.env.JWT_SECRET ?? '';
    return sign(user, secret, {
        expiresIn: '12h'
    });
}

export { createToken };
