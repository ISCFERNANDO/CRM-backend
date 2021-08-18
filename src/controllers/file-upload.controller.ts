import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import responseHandler from '../common/response-handler';
import { Messages } from './../constants/messages';
import { FileUploadService } from './../services/upload-file.service';

@Service()
export class FileUploadController {
    constructor(private uploadService: FileUploadService) {}

    async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.uploadService.uploadFile(req);
            responseHandler(res, Messages.UPLOAD_SUCCESS, data);
        } catch (error) {
            next(error);
        }
    }
}
