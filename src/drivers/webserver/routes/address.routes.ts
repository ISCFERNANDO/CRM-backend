import { Router } from 'express';
import { Container } from 'typedi';
import { AddressController } from '../../../controllers/address.controller';

const initializeAddressRouter = (): Router => {
    const controller = Container.get(AddressController);

    const routes = Router();
    routes
        .route('/v1/address')
        .get((req, res, next) => controller.findAddressByCp(req, res, next));
    return routes;
};

export { initializeAddressRouter };
