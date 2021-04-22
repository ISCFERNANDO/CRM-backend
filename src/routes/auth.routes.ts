import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import loginValidator from '../validators/login.validator';

const authRoute = Router();
authRoute.route('/v1/auth').post(loginValidator, login);

export default authRoute;
