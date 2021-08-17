import { NextFunction, Request } from 'express';
import * as formidable from 'formidable';
import * as fs from 'fs';
import { join } from 'path';
import { Service } from 'typedi';
import { DIR_IMG_PROFILE_USR } from '../constants/resources.json';
import { createDirectoryIfNotExist, createFile } from '../utils/file-utils';
import { removeSpecialCharsInUrl } from '../utils/string-utils';

@Service()
export class FileUploadService {
    async uploadFile(
        request: Request,
        next: NextFunction
    ): Promise<Object | void> {
        try {
            const { files } = await this.formidableParse(request);
            const fileName = `${new Date().getTime()}_${removeSpecialCharsInUrl(
                files.image.name
            )}`;
            const imageUrl = `${process.env.HOST}:${process.env.PORT}/${DIR_IMG_PROFILE_USR}/${fileName}`;
            const oldPath = files.image.path;
            const pathDirectory = join(
                __dirname,
                '../public',
                DIR_IMG_PROFILE_USR
            );
            createDirectoryIfNotExist(pathDirectory);

            const newPath = join(pathDirectory, fileName);
            const data = fs.readFileSync(oldPath);
            await createFile(newPath, data);
            return { fileName, imageUrl };
        } catch (error) {
            next(error);
        }
    }

    private formidableParse(request: Request): Promise<any> {
        return new Promise((resolve, reject) => {
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
}
