import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler
{
    return async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnkown: true,
            stripUnkown: true
        };
        try {
            const value = await schema.validateAsync(req.body, validationOptions);
            req.body = value;
            next()
        } catch (error: any) {
            const errors: string[] = [];
            error.details.forEach((err: Joi.ValidationErrorItem) => {
                errors.push(err.message)
            });
            res.status(400).send({errors})
        }
    }
}
export default validationMiddleware