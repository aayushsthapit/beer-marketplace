import { Request, Response, NextFunction } from 'express';

import * as todosService from '../services/todos';

/**
 * Controller to fetch list of todos.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function getTodos(req: Request, res: Response, next: NextFunction) {
    todosService.getTodos()
    .then((data) => res.json(data))
    .catch((err) => next(err))
  }