import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HttpException from '../common/http.exception';
import { Messages } from './../constants/messages';

const loginValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await Promise.all([
        body('email')
            .exists()
            .withMessage('El email es un campo obligatorio')
            .notEmpty()
            .withMessage('El email es un campo obligatorio')
            .run(req),
        body('password')
            .exists()
            .withMessage('El email es un campo obligatorio')
            .notEmpty()
            .withMessage('El email es un campo obligatorio')
            .run(req)
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpException(400, Messages.BAD_REQUEST, errors.array()[0]));
        return;
    }
    next();
};

export default loginValidator;
