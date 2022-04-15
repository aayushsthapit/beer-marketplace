import Joi from 'joi';

import { Status } from '../constants/enums';

// Validation schema for request body of API that creates a new subtask.
export const subtaskCreateSchema = Joi.object({
  title: Joi.string().required(),
  todosId: Joi.number().required()
});

// Validation schema for request body of API that updates an existing subtask.
export const subtaskUpdateSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(Status))
    .required()
});
