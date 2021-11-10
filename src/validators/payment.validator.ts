import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HttpException from '../common/http.exception';
import { Messages } from './../constants/messages';

const createPaymentValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rules = [
        body('prestamoId')
            .exists()
            .withMessage('El identificador del prestamo es requerido')
            .isLength({ min: 10 })
            .withMessage(
                'El identificador del prestamo debe tener mínimo 10 caracteres'
            )
            .run(req),
        body('pagoId')
            .exists()
            .withMessage('El identificador del pago es requerido')
            .isLength({ min: 10 })
            .withMessage(
                'El identificador del pago debe tener mínimo 10 caracteres'
            )
            .run(req),
        body('paymentDate')
            .exists()
            .withMessage('La fecha de pago de crédito es requerido')
            .matches(
                /(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})$/i
            )
            .withMessage(
                'La fecha de pago debe cumplir el siguiente formato DD/MM/YYYY'
            )
            .run(req),
        body('paymentAmount')
            .exists()
            .withMessage('El monto del pago es requerido')
            .matches(/[0-9]+(.[0-9]+)?$/i)
            .withMessage('El monto del pago es inválido')
            .run(req)
    ];

    await Promise.all(rules);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpException(400, Messages.BAD_REQUEST, errors.array()[0]));
        return;
    }
    next();
};

export default createPaymentValidator;
