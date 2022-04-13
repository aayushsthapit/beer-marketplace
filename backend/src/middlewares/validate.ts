import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

/**
 * Validates the request body against the given schema.
 *
 * @param {Joi.ObjectSchema<any>} schema
 */
export function validateSchema(schema: Joi.ObjectSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body);
        if(!!error){
            next(error);
        }

        next();
      }
}
