import { Router } from 'express';
import { Container } from 'typedi';
import { FileUploadController } from '../../../controllers/file-upload.controller';

const controller = Container.get(FileUploadController);
const fileUploadRoute = Router();

fileUploadRoute
    .route('/v1/uploads')
    .post((req, res, next) => controller.uploadFile(req, res, next));

export default fileUploadRoute;
