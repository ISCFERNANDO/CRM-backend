import { NextFunction, Request, Response } from 'express';
import { validateAndDecodeToken } from '../utils/jwt-utils';

export const authValidatorMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const headers = request.headers;
    let token = headers.authorization ?? '';
    token = token.replace('Bearer ', '');
    try {
        const data = validateAndDecodeToken(token);
        request.headers.user = data?.payload;
        next();
    } catch (error) {
        next(error);
    }
};
