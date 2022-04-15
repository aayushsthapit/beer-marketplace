import Joi from 'joi';

import { Status } from '../constants/enums';

// Validation schema for request body of API that creates a new todo.
export const todoCreateSchema = Joi.object({
  title: Joi.string().required()
});

// Validation schema for request body of API that updates an existing todo.
export const todoUpdateSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(Status))
    .required()
});
