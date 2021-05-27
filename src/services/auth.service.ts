import { NextFunction } from 'express';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { LoginRequest, LoginResponse } from '../dto/login.dto';
import * as userRepository from '../repositories/user.repository';
import { mapUser } from '../services/user.service';
import { createToken } from '../utils/jwt-utils';
import { Messages } from './../constants/messages';

const login = async function (
    loginContract: LoginRequest,
    next: NextFunction
): Promise<LoginResponse | void> {
    try {
        const data = await userRepository.findByEmailAndPassword(
            loginContract.email,
            loginContract.password
        );
        if (!data) {
            next(
                new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.EMAIL_OR_PASSWORD_NOT_FOUND
                )
            );
            return;
        }
        const userData: LoginResponse = await mapUser(data, true);
        userData.token = createToken(userData);
        return userData;
    } catch (error) {
        console.log(error);
        next(
            new HttpException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                Messages.ERROR_LOGIN
            )
        );
    }
};

export { login };
