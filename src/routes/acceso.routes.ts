import { Router } from 'express';
import {
    addAccess,
    deleteAccess,
    findById,
    getAllAccess,
    updateAccess
} from '../controllers/acceso.controller';

const accesoRoute = Router();
accesoRoute.route('/access').get(getAllAccess).post(addAccess);
accesoRoute
    .route('/access/:id')
    .get(findById)
    .put(updateAccess)
    .delete(deleteAccess);

export default accesoRoute;
