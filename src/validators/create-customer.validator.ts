import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import HttpException from '../common/http.exception';
import { Messages } from './../constants/messages';

const createCustomervalidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const rules = [
        body('tipoPersona')
            .exists()
            .withMessage('El tipo de persona es un campo obligatorio')
            .isLength({ min: 1, max: 1 })
            .withMessage('El tipo de persona debe tener un solo caracter')
            .matches(/^[F|M]$/i)
            .withMessage('El tipo de persona debe ser F o M')
            .run(req),
        body('razonSocial')
            .optional({ nullable: true })
            .isLength({ min: 0, max: 60 })
            .withMessage('La razon social debe tener entre 1 y 40 caracteres')
            .matches(/^$|^[a-z 0-9 ,.áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage(
                'La razon social solo debe contener letras y números, punto y coma'
            )
            .run(req),
        body('nombreEmpresa')
            .optional({ nullable: true })
            .isLength({ min: 0, max: 60 })
            .withMessage(
                'El nombre de la empresa debe tener entre 1 y 40 caracteres'
            )
            .matches(/^$|^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+?$/i)
            .withMessage(
                'El nombre de la empresa solo debe contener letras y números'
            )
            .run(req),
        body('sitioWeb')
            .optional({ nullable: true })
            .matches(/(https?:\/\/.*|)$/i)
            .withMessage('El sitio web no tiene el formato correcto')
            .run(req),
        body('photoUrl')
            .optional({ nullable: true })
            .matches(/(https?:\/\/.*\.(?:png|jpg))$/i)
            .withMessage('La ruta de la imágen no tiene el formato correcto')
            .run(req),
        body('telefonos')
            .exists()
            .withMessage('Los telefonos son requeridos')
            .isArray({ min: 1 })
            .withMessage(
                'Los telefonos debe ser un arreglo y debe tener mínimo 1 elemento'
            )
            .run(req),
        body('telefonos.*.tipoTelefono')
            .exists()
            .withMessage('El tipo de telefono es requerido')
            .isNumeric()
            .withMessage('El tipo de telefono debe ser numérico')
            .run(req),
        body('telefonos.*.telefono')
            .exists()
            .withMessage('El telefono es un campo requerido')
            .isNumeric()
            .withMessage('El telefono debe ser numérico')
            .isLength({ min: 10, max: 10 })
            .withMessage('El teléfono debe tener 10 caracteres')
            .run(req),
        body('telefonos.*.extension')
            .optional({ nullable: true })
            .isNumeric()
            .withMessage('La extensión debe ser numérico')
            .isLength({ min: 1, max: 6 })
            .withMessage('La extensión debe tener entre 1 y 6 caracteres')
            .run(req),
        body('representante')
            .exists()
            .withMessage('El representante es requerido')
            .run(req),
        body('representante.name')
            .exists()
            .withMessage('El nombre de representante es requerido')
            .isLength({ min: 1, max: 40 })
            .withMessage('El nombre debe tener entre 1 y 40 caracteres')
            .matches(/^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('El nombre solo debe contener letras y números')
            .run(req),
        body('representante.firstSurname')
            .exists()
            .withMessage('El primer apellido representante es requerido')
            .isLength({ min: 1, max: 40 })
            .withMessage(
                'El primer apellido debe tener entre 1 y 40 caracteres'
            )
            .matches(/^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage(
                'El primer apellido solo debe contener letras y números'
            )
            .run(req),
        body('representante.secondSurname')
            .optional({ nullable: true })
            .isLength({ min: 0, max: 40 })
            .withMessage(
                'El segundo apellido debe tener entre 1 y 40 caracteres'
            )
            .matches(/^$|^[a-z 0-9 ,áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage(
                'El segundo apellido solo debe contener letras y números'
            )
            .run(req),
        body('representante.email')
            .isLength({ min: 0, max: 70 })
            .withMessage('El correo debe tener entre 1 y 70 caracteres')
            .matches(/^$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
            .withMessage('El email no tiene el formato correcto')
            .run(req),

        body('direccion.codigoPostal')
            .exists()
            .withMessage('El código postal es requerido')
            .isNumeric()
            .withMessage('El código postal debe ser numérico')
            .isLength({ min: 5, max: 5 })
            .withMessage('El código postal debe tener 5 caracteres')
            .run(req),
        body('direccion.pais')
            .exists()
            .withMessage('El pais es requerido')
            .run(req),
        body('direccion.estado')
            .exists()
            .withMessage('El estado es requerido')
            .run(req),
        body('direccion.colonia')
            .exists()
            .withMessage('La colonia es requerido')
            .isLength({ min: 1, max: 60 })
            .withMessage('La colonia debe tener entre 1 y 60 caracteres')
            .matches(/^[a-z 0-9 ,.áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('El colonia solo debe contener letras y números')
            .run(req),
        body('direccion.calle')
            .exists()
            .withMessage('La calle es requerido')
            .isLength({ min: 1, max: 60 })
            .withMessage('La calle debe tener entre 1 y 60 caracteres')
            .matches(/^[a-z 0-9 ,.áéíóúÁÉÍÓÚñÑ äëïöüÄËÏÖÜñÑ']+$/i)
            .withMessage('El calle solo debe contener letras y números')
            .run(req),
        body('direccion.numeroExterior')
            .isLength({ min: 0, max: 8 })
            .withMessage('El número exterior debe tener entre 1 y 8 caracteres')
            .matches(/^([0-9]+|(S\/N)|(Lote [0-9]+))$/i)
            .withMessage(
                'El número exterior solo debe tener números, S/N ó Lote'
            )
            .run(req),
        body('direccion.numeroInterior')
            .isLength({ min: 0, max: 8 })
            .withMessage('El número interior debe tener entre 1 y 8 caracteres')
            .matches(/^$|^([0-9]+|(S\/N)|(Lote [0-9]+))$/i)
            .withMessage(
                'El número interior solo debe tener números, S/N ó Lote'
            )
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

export default createCustomervalidator;
