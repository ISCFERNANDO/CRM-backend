import { NextFunction, Request, Response } from 'express';
import responseHandler from '../common/response-handler';
import * as uploadService from '../services/upload-file.service';
import { Messages } from './../constants/messages';

const uploadFile = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    const data = await uploadService.uploadFile(req, next);
    responseHandler(res, Messages.UPLOAD_SUCCESS, data);
};

export { uploadFile };
