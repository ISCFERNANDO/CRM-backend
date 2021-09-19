import { Router } from 'express';
import { Container } from 'typedi';
import { UserController } from '../../../controllers/user.controller';
import createUservalidator from '../../../validators/create-user.validator';

const initializeUserRoutes = (): Router => {
    const controller = Container.get(UserController);

    const routes = Router();
    routes
        .route('/v1/users')
        .get((req, res, next) => controller.getAllUsers(req, res, next))
        .post(createUservalidator, (req, res, next) =>
            controller.addUser(req, res, next)
        )
        .delete((req, res, next) => controller.deleteUsers(req, res, next));

    routes
        .route('/v1/users/:id')
        .get((req, res, next) => controller.findById(req, res, next))
        .put(createUservalidator, (req, res, next) =>
            controller.updateUser(req, res, next)
        )
        .patch((req, res, next) => controller.partialUpdate(req, res, next))
        .delete((req, res, next) => controller.deleteUser(req, res, next));
    return routes;
};

export { initializeUserRoutes };
