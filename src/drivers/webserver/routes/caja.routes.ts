import { Router } from 'express';
import 'reflect-metadata';
import Container from 'typedi';
import createCajaValidator from '../../../validators/create-caja.validator';
import { CajaController } from './../../../controllers/caja.controller';

const initializeCajaRoutes = (): Router => {
    const controller = Container.get(CajaController);

    const routes = Router();
    routes
        .route('/v1/cajas')
        .post(createCajaValidator, (req, res, next) =>
            controller.addCaja(req, res, next)
        );
    return routes;
};

export { initializeCajaRoutes };
