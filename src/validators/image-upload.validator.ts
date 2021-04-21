import { NextFunction, Request, Response } from 'express';
import * as formidable from 'formidable';
import HttpException from '../common/http.exception';
import { Messages } from './../constants/messages';

const imageUploadValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const fileTypes = [
        'image/jpeg',
        'image/svg',
        'image/jpg',
        'image/png',
        'image/gif'
    ];
    console.log('in validator');
    const form = new formidable.IncomingForm({
        multiples: false,
        maxFileSize: 10 * 1024 * 1024 //10mb,
    });
    form.onPart = (part) => {
        console.log('on part');
        if (fileTypes.indexOf(part.mime ?? '') === -1) {
            console.log('in if');
            next(
                new HttpException(
                    400,
                    Messages.BAD_REQUEST,
                    'El tipo de archivo no es soportado'
                )
            );
            return;
        }
        if (!part.filename || fileTypes.indexOf(part.mime ?? '') !== -1) {
            // Let formidable handle the non file-pars and valid file types
            form.handlePart(part);
        }
        console.log('in next');
        next();
    };
    next();
    console.log('fin');
};

export default imageUploadValidator;
