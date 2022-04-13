import Joi from 'joi';

// Schema for request body for API that creates a todo.
export const todoCreateSchema = Joi.object({
    title: Joi.string().required()
});

