import { Router } from 'express';
import 'reflect-metadata';
import Container from 'typedi';
import { AccessoController } from '../../../controllers/acceso.controller';
import createAccessvalidator from '../../../validators/create-acceso.validator';

const initializeAccessRoutes = (): Router => {
    const controller = Container.get(AccessoController);

    const routes = Router();
    routes
        .route('/v1/access')
        .get((req, res, next) => controller.getAllAccess(req, res, next))
        .post(createAccessvalidator, (req, res, next) =>
            controller.addAccess(req, res, next)
        )
        .delete((req, res, next) => controller.deleteAccessess(req, res, next));
    routes
        .route('/v1/access/:id')
        .get((req, res, next) => controller.findById(req, res, next))
        .put(createAccessvalidator, (req, res, next) =>
            controller.updateAccess(req, res, next)
        )
        .delete((req, res, next) => controller.deleteAccess(req, res, next));
    return routes;
};

export { initializeAccessRoutes };
