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
        .get((req, res, next) => controller.findAll(req, res, next))
        .post(createCajaValidator, (req, res, next) =>
            controller.addCaja(req, res, next)
        );

    routes
        .route('/v1/cajas/:id')
        .get((req, res, next) => controller.findById(req, res, next));

    routes
        .route('/v1/cajas/:id/ingresos')
        .post((req, res, next) => controller.ingresoEfectivo(req, res, next));
    return routes;
};

export { initializeCajaRoutes };
