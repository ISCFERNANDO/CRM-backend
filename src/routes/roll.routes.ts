import { Router } from 'express';
import {
    addRoll,
    deleteRoll,
    getAllRolls,
    updateRoll
} from '../controllers/rol.controller';

const accesoRoute = Router();
accesoRoute
    .route('/rolls')
    .get(getAllRolls)
    .post(addRoll)
    .put(updateRoll)
    .delete(deleteRoll);

export default accesoRoute;
