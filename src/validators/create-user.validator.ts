import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HttpException from '../common/http.exception';
import { Messages } from './../constants/messages';

const createUservalidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rules = [
        body('name')
            .exists()
            .withMessage('El nombre es un campo obligatorio')
            .isLength({ min: 1, max: 40 })
            .withMessage('El nombre debe tener entre 1 y 40 caracteres')
            .matches(/^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('El nombre solo debe contener letras y números')
            .run(req),
        body('firstSurname')
            .exists()
            .withMessage('El primer apellido es un campo requerido')
            .isLength({ min: 1, max: 40 })
            .withMessage(
                'El primer apellido debe tener entre 1 y 40 caracteres'
            )
            .matches(/^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage(
                'El primer apellido solo debe contener letras y números'
            )
            .run(req),
        body('secondSurname')
            .isLength({ min: 1, max: 40 })
            .withMessage(
                'El segundo apellido debe tener entre 1 y 40 caracteres'
            )
            .matches(/^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage(
                'El segundo apellido solo debe contener letras y números'
            )
            .run(req),
        body('email')
            .exists()
            .withMessage('El email es un campo requerido')
            .isLength({ min: 1, max: 70 })
            .withMessage('El correo debe tener entre 1 y 70 caracteres')
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
            .withMessage('El email no tiene el formato correcto')
            .run(req),
        body('phoneNumber')
            .isLength({ min: 10, max: 10 })
            .withMessage('El número de teléfono debe tener 10 caracteres')
            .isNumeric()
            .withMessage('El número de teléfono debe ser numérico')
            .run(req),
        body('age')
            .isInt({ min: 18, max: 150 })
            .withMessage('La edad debe ser numérico y entre 18 y 150 años')
            .run(req),
        body('photoUrl')
            .optional({ nullable: true })
            .matches(/(https?:\/\/.*\.(?:png|jpg))$/i)
            .withMessage('La ruta de la imágen no tiene el formato correcto')
            .run(req),
        body('customRol')
            .exists()
            .withMessage('El campo rol personalizado es requerido')
            .isBoolean()
            .withMessage(
                'El campo rol personalizado solo acepta valores boleanos (true/false)'
            )
            .run(req),
        body('password')
            .exists()
            .withMessage('El password es un campo requerido')
            .notEmpty()
            .withMessage('El password es un campo requerido')
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
    ];

    if (req.body.customRol === true) {
        rules.push(
            body('accesess')
                .exists()
                .withMessage('Los accesos es un arreglo requerido')
                .isArray({ min: 1 })
                .withMessage(
                    'El campo accesess debe ser un arreglo y debe tener al menos un elemento'
                )
                .run(req),
            body('accesess.*.id')
                .exists()
                .withMessage('Los elementos de accesos debe tener el campo id')
                .run(req)
        );
    } else {
        rules.push(
            body('rol')
                .exists()
                .withMessage('El rol es un campo requerido')
                .isObject()
                .withMessage('El campo rol debe ser un object')
                .run(req),
            body('rol.id')
                .exists()
                .withMessage('El objeto rol debe tener el campo id')
                .run(req)
        );
    }
    await Promise.all(rules);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpException(400, Messages.BAD_REQUEST, errors.array()[0]));
        return;
    }
    next();
};

export default createUservalidator;
