import { Router } from 'express';
import { authValidatorMiddleware } from '../middlewares/auth-validator.middleware';
import accesoRoutes from './acceso.routes';
import authRoutes from './auth.routes';
import customerRoutes from './customer.routes';
import rollRoutes from './roll.routes';
import uploadRoutes from './upload.routes';
import userRoutes from './user.routes';

const routes = Router();
routes.use(
    authRoutes,
    authValidatorMiddleware,
    accesoRoutes,
    rollRoutes,
    userRoutes,
    uploadRoutes,
    customerRoutes
);

export default routes;
