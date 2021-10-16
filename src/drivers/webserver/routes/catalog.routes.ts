import { Router } from 'express';
import 'reflect-metadata';
import Container from 'typedi';
import { CatalogController } from '../../../controllers/catalog.controller';

const initializeCatalogRoutes = (): Router => {
    const controller = Container.get(CatalogController);

    const routes = Router();
    routes
        .route('/v1/types-currency')
        .get((req, res, next) => controller.getAllCurrency(req, res, next));

    routes
        .route('/v1/plazos-credito')
        .get((req, res, next) =>
            controller.getAllPlazosCredito(req, res, next)
        );

    routes
        .route('/v1/plazos-pago')
        .get((req, res, next) => controller.getAllPlazosPago(req, res, next));
    return routes;
};

export { initializeCatalogRoutes };
