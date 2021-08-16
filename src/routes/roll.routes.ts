import { Router } from 'express';
import Container from 'typedi';
import { RollController } from '../controllers/rol.controller';
import createRollvalidator from '../validators/create-roll.validator';

const controller = Container.get(RollController);

const accesoRoute = Router();
accesoRoute
    .route('/v1/rolls')
    .get((req, res, next) => controller.getAllRolls(req, res, next))
    .post(createRollvalidator, (req, res, next) =>
        controller.addRoll(req, res, next)
    )
    .delete((req, res, next) => controller.deleteRolls(req, res, next));
accesoRoute
    .route('/v1/rolls/:id')
    .get((req, res, next) => controller.findById(req, res, next))
    .put(createRollvalidator, (req, res, next) =>
        controller.updateRoll(req, res, next)
    )
    .patch((req, res, next) => controller.partialUpdate(req, res, next))
    .delete((req, res, next) => controller.deleteRoll(req, res, next));

export default accesoRoute;
