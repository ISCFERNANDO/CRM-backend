import { Router } from 'express';
import { Container } from 'typedi';
import { FileUploadController } from '../../../controllers/file-upload.controller';

const initializeFileUploadRoutes = (): Router => {
    const controller = Container.get(FileUploadController);

    const routes = Router();

    routes
        .route('/v1/uploads')
        .post((req, res, next) => controller.uploadFile(req, res, next));
    return routes;
};

export { initializeFileUploadRoutes };
