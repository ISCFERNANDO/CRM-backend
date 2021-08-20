import { Router } from 'express';
import { Container } from 'typedi';
import { AddressController } from '../../../controllers/address.controller';

const controller = Container.get(AddressController);

const addressRoute = Router();
addressRoute
    .route('/v1/address')
    .get((req, res, next) => controller.findAddressByCp(req, res, next));

export default addressRoute;
