import { Router } from 'express';
import { authValidatorMiddleware } from './../../../middlewares/auth-validator.middleware';
import { initializeAccessRoutes } from './acceso.routes';
import { initializeAddressRouter } from './address.routes';
import { initializeAuthRoutes } from './auth.routes';
import { initializeCajaRoutes } from './caja.routes';
import { initializeCatalogRoutes } from './catalog.routes';
import { initializeCustomerRoutes } from './customer.routes';
import { initializeInterestRoutes } from './interest.routes';
import { initializePrestamoRoutes } from './prestamo.routes';
import { initializeRollRoutes } from './roll.routes';
import { initializeFileUploadRoutes } from './upload.routes';
import { initializeUserRoutes } from './user.routes';

const initializeRoutes = (): Router => {
    const routes = Router();

    routes.use(
        initializeAuthRoutes(),
        authValidatorMiddleware,
        initializeAccessRoutes(),
        initializeAddressRouter(),
        initializeCustomerRoutes(),
        initializeRollRoutes(),
        initializeFileUploadRoutes(),
        initializeUserRoutes(),
        initializeCatalogRoutes(),
        initializeInterestRoutes(),
        initializePrestamoRoutes(),
        initializeCajaRoutes()
    );

    return routes;
};

export { initializeRoutes };
