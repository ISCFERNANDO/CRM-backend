import { Router } from 'express';
import { initializeAccessRoutes } from './acceso.routes';
import { initializeAddressRouter } from './address.routes';
import { initializeAuthRoutes } from './auth.routes';
import { initializeCustomerRoutes } from './customer.routes';
import { initializeRollRoutes } from './roll.routes';
import { initializeFileUploadRoutes } from './upload.routes';
import { initializeUserRoutes } from './user.routes';

const initializeRoutes = (): Router => {
    const routes = Router();

    routes.use(
        initializeAuthRoutes(),
        //authValidatorMiddleware,
        initializeAccessRoutes(),
        initializeAddressRouter(),
        initializeCustomerRoutes(),
        initializeRollRoutes(),
        initializeFileUploadRoutes(),
        initializeUserRoutes()
    );

    return routes;
};

export { initializeRoutes };
