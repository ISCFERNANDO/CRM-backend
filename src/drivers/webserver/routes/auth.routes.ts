import { Router } from 'express';
import { Container } from 'typedi';
import { AuthController } from '../../../controllers/auth.controller';
import loginValidator from '../../../validators/login.validator';

const controller = Container.get(AuthController);

const authRoute = Router();
authRoute
    .route('/v1/auth')
    .post(loginValidator, (req, res, next) => controller.login(req, res, next));

export default authRoute;
