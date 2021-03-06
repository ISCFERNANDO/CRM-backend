import { Router } from 'express';
import {
    addAccess,
    deleteAccess,
    deleteAccessess,
    findById,
    getAllAccess,
    updateAccess
} from '../controllers/acceso.controller';
import createAccessvalidator from '../validators/create-acceso.validator';

const accesoRoute = Router();
accesoRoute
    .route('/v1/access')
    .get(getAllAccess)
    .post(createAccessvalidator, addAccess)
    .delete(deleteAccessess);
accesoRoute
    .route('/v1/access/:id')
    .get(findById)
    .put(createAccessvalidator, updateAccess)
    .delete(deleteAccess);

export default accesoRoute;
