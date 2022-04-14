import Joi from 'joi';

import { Status } from '../constants/enums';

// Schema for request body for API that creates a todo.
export const todoCreateSchema = Joi.object({
    title: Joi.string().required()
});

export const todoUpdateSchema = Joi.object({
    status: Joi.string().valid(...Object.values(Status)).required()
});
