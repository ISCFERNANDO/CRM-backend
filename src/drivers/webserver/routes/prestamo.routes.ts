import { Router } from 'express';
import { Container } from 'typedi';
import { PrestamoController } from '../../../controllers/prestamo.controller';
import createPrestamoValidator from '../../../validators/create-prestamo.validator';

const initializePrestamoRoutes = (): Router => {
    const controller = Container.get(PrestamoController);

    const routes = Router();
    routes
        .route('/v1/prestamos')
        .get((req, res, next) => controller.findAllPrestamos(req, res, next))
        .post(createPrestamoValidator, (req, res, next) =>
            controller.addPrestamo(req, res, next)
        );

    routes
        .route('/v1/prestamos/:id/confirmacion')
        .post((req, res, next) => controller.confirmPrestamo(req, res, next));

    return routes;
};

export { initializePrestamoRoutes };
