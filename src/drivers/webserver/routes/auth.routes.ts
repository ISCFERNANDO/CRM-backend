import { Router } from 'express';
import { Container } from 'typedi';
import { AuthController } from '../../../controllers/auth.controller';
import loginValidator from '../../../validators/login.validator';

const initializeAuthRoutes = (): Router => {
    const controller = Container.get(AuthController);

    const routes = Router();
    routes
        .route('/v1/auth')
        .post(loginValidator, (req, res, next) =>
            controller.login(req, res, next)
        );
    return routes;
};

export { initializeAuthRoutes };
