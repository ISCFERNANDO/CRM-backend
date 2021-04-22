import { Router } from 'express';
import accesoRoutes from './acceso.routes';
import rollRoutes from './roll.routes';
import uploadRoutes from './upload.routes';
import userRoutes from './user.routes';

const routes = Router();
routes.use(accesoRoutes);
routes.use(rollRoutes);
routes.use(userRoutes);
routes.use(uploadRoutes);

export default routes;
