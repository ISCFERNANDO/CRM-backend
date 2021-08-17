import { NextFunction } from 'express';
import { Service } from 'typedi';
import HttpException from '../common/http.exception';
import { HttpStatus } from '../constants/http-status';
import { LoginRequest, LoginResponse } from '../dto/login.dto';
import { UserRepository } from '../repositories/user.repository';
import { createToken } from '../utils/jwt-utils';
import { Messages } from './../constants/messages';
import { UserService } from './user.service';

@Service()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private userService: UserService
    ) {}

    async login(
        loginContract: LoginRequest,
        next: NextFunction
    ): Promise<LoginResponse | void> {
        try {
            const data = await this.userRepository.findByEmailAndPassword(
                loginContract.email,
                loginContract.password
            );
            if (!data) {
                throw new HttpException(
                    HttpStatus.NOT_FOUND,
                    Messages.EMAIL_OR_PASSWORD_NOT_FOUND
                );
            }
            const userData: LoginResponse = await this.userService.mapUser(
                data,
                true
            );
            userData.token = createToken(userData);
            return userData;
        } catch (error) {
            next(error);
        }
    }
}
