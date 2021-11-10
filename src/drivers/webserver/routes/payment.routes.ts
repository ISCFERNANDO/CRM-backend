import { Router } from 'express';
import Container from 'typedi';
import createPaymentValidator from '../../../validators/payment.validator';
import { PaymentController } from './../../../controllers/payment.controller';

const initializePaymentRoutes = (): Router => {
    const controller = Container.get(PaymentController);

    const routes = Router();
    routes
        .route('/v1/payments')
        .post(createPaymentValidator, (req, res, next) =>
            controller.makePayment(req, res, next)
        );
    return routes;
};

export { initializePaymentRoutes };
