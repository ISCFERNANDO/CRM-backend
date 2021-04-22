import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HttpException from '../common/http.exception';
import { Messages } from './../constants/messages';

const createAccessvalidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await Promise.all([
        body('name')
            .exists()
            .withMessage('El nombre es un campo obligatorio')
            .isLength({ min: 1, max: 25 })
            .withMessage(
                'El nombre debe tener como mínimo 1 caracter y 25 como máximo'
            )
            .matches(/^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('El nombre solo debe contener letras y números')
            .run(req),
        body('route')
            .exists()
            .withMessage('La ruta es un campo requerido')
            .isLength({ min: 1, max: 25 })
            .withMessage(
                'La ruta debe tener como mínimo 1 caracter y 25 como máximo'
            )
            .matches(/^\/[a-z]+$/i)
            .withMessage(
                'La ruta solo debe contener letras y diagonal al inicio'
            )
            .run(req),
        body('description')
            .isLength({ max: 150 })
            .withMessage('La descripción debe tener máxmimo 150 caracteres')
            .matches(/^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('La descripción solo debe contener letras y números')
            .run(req),
        body('active')
            .exists()
            .withMessage('El campo active es requerido')
            .isBoolean()
            .withMessage(
                'El campo active solo acepta valores boleanos (true/false)'
            )
            .run(req),
        body('isSystem')
            .exists()
            .withMessage('El campo isSystem es requerido')
            .isBoolean()
            .withMessage(
                'El campo isSystem solo acepta valores boleanos (true/false)'
            )
            .run(req)
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpException(400, Messages.BAD_REQUEST, errors.array()[0]));
        return;
    }
    next();
};

export default createAccessvalidator;
