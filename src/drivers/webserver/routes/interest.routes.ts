import { Router } from 'express';
import Container from 'typedi';
import { InterestController } from './../../../controllers/interest.controller';

const initializeInterestRoutes = (): Router => {
    const controller = Container.get(InterestController);

    const routes = Router();
    routes
        .route('/v1/interests')
        .get((req, res, next) => controller.getAllInterests(req, res, next));
    return routes;
};

export { initializeInterestRoutes };
