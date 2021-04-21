import { NextFunction, Request } from 'express';
import * as formidable from 'formidable';
import * as fs from 'fs';
import { join } from 'path';
import HttpException from '../common/http.exception';
import { DIR_IMG_PROFILE_USR } from '../constants/resources.json';
import { createDirectoryIfNotExist, createFile } from '../utils/file-utils';

const uploadFile = async function (
    request: Request,
    next: NextFunction
): Promise<Object | void> {
    try {
        const { files } = await formidableParse(request);
        const imageUrl = `${process.env.HOST}:${process.env.PORT}/${DIR_IMG_PROFILE_USR}/${files.image.name}`;
        const oldPath = files.image.path;
        const pathDirectory = join(
            __dirname,
            '../..',
            'public',
            DIR_IMG_PROFILE_USR
        );
        createDirectoryIfNotExist(pathDirectory);

        const newPath = join(pathDirectory, files.image.name);
        const data = fs.readFileSync(oldPath);
        await createFile(newPath, data);
        return { imageUrl };
    } catch (error) {
        console.log(error);
        next(new HttpException(404, 'Ocurrió un error al subir el archivo'));
    }
};

function formidableParse(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
        /* const fileTypes = [
            'image/jpeg',
            'image/svg',
            'image/jpg',
            'image/png',
            'image/gif'
        ]; */
        const form = new formidable.IncomingForm({
            multiples: false,
            maxFileSize: 10 * 1024 * 1024 //10mb,
        });

        form.parse(request, function (error: any, fields: any, files: any) {
            if (error) {
                return reject(error);
            }
            resolve({ fields, files });
        });
    });
}

export { uploadFile };
