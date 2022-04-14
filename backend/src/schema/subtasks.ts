import Joi from 'joi';

// Validation schema for request body of API that creates a new subtask.
export const subtaskCreateSchema = Joi.object({
    title: Joi.string().required(),
    todosId: Joi.number().required()
});
