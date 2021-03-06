import { Router } from 'express';
import {
    addRoll,
    deleteRoll,
    deleteRolls,
    findById,
    getAllRolls,
    partialUpdate,
    updateRoll
} from '../controllers/rol.controller';
import createRollvalidator from '../validators/create-roll.validator';

const accesoRoute = Router();
accesoRoute
    .route('/v1/rolls')
    .get(getAllRolls)
    .post(createRollvalidator, addRoll)
    .delete(deleteRolls);
accesoRoute
    .route('/v1/rolls/:id')
    .get(findById)
    .put(createRollvalidator, updateRoll)
    .patch(partialUpdate)
    .delete(deleteRoll);

export default accesoRoute;
