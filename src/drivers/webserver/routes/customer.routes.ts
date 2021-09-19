import { Router } from 'express';
import { Container } from 'typedi';
import { CustomerController } from '../../../controllers/customer.controller';
import createCustomervalidator from '../../../validators/create-customer.validator';

const initializeCustomerRoutes = (): Router => {
    const controller = Container.get(CustomerController);

    const routes = Router();
    routes
        .route('/v1/customers')
        .get((req, res, next) => controller.getAllCustomers(req, res, next))
        .post(createCustomervalidator, (req, res, next) =>
            controller.addCustomer(req, res, next)
        )
        .delete((req, res, next) => controller.deleteCustomers(req, res, next));

    routes
        .route('/v1/customers/:id')
        .get((req, res, next) => controller.findById(req, res, next))
        .put(createCustomervalidator, (req, res, next) =>
            controller.updateCustomer(req, res, next)
        )
        .patch((req, res, next) => controller.partialUpdate(req, res, next))
        .delete((req, res, next) => controller.deleteCustomer(req, res, next));
    return routes;
};

export { initializeCustomerRoutes };
