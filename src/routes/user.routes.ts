import { Router } from 'express';
import { Container } from 'typedi';
import { UserController } from '../controllers/user.controller';
import createUservalidator from '../validators/create-user.validator';

const controller = Container.get(UserController);

const accesoRoute = Router();
accesoRoute
    .route('/v1/users')
    .get((req, res, next) => controller.getAllUsers(req, res, next))
    .post(createUservalidator, (req, res, next) =>
        controller.addUser(req, res, next)
    )
    .delete((req, res, next) => controller.deleteUsers(req, res, next));

accesoRoute
    .route('/v1/users/:id')
    .get((req, res, next) => controller.findById(req, res, next))
    .put(createUservalidator, (req, res, next) =>
        controller.updateUser(req, res, next)
    )
    .patch((req, res, next) => controller.partialUpdate(req, res, next))
    .delete((req, res, next) => controller.deleteUser(req, res, next));

export default accesoRoute;
