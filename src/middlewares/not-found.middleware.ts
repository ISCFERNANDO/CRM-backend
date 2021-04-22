import { NextFunction, Request, Response } from 'express';
import { Messages } from './../constants/messages';

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const message = Messages.NOT_FOUND_ENDPOINT;
    response.status(404).send(message);
};
