import { Router } from 'express';
import {
    addUser,
    deleteUser,
    deleteUsers,
    findById,
    getAllUsers,
    partialUpdate,
    updateUser
} from '../controllers/user.controller';
import createUservalidator from '../validators/create-user.validator';

const accesoRoute = Router();
accesoRoute
    .route('/v1/users')
    .get(getAllUsers)
    .post(createUservalidator, addUser)
    .delete(deleteUsers);
accesoRoute
    .route('/v1/users/:id')
    .get(findById)
    .put(createUservalidator, updateUser)
    .patch(partialUpdate)
    .delete(deleteUser);

export default accesoRoute;
