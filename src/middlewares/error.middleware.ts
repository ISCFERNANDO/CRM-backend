import { NextFunction, Request, Response } from 'express';
import HttpException from '../common/http.exception';
import { HttpStatus } from './../constants/http-status';
import { Messages } from './../constants/messages';

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error.statusCode) {
        response.status(error.statusCode).send(error);
    } else {
        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(
                new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    Messages.INTERNAL_SERVER_ERROR,
                    error.message
                )
            );
    }
};
