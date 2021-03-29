import { Router } from 'express';
import accesoRoutes from './acceso.routes';
import rollRoutes from './roll.routes';
const routes = Router();

routes.use(accesoRoutes);
routes.use(rollRoutes);

export default routes;
