import { Request, Response, NextFunction } from 'express';

import * as todoService from '../services/todo';

/**
 * Controller to fetch list of todos.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function getTodo(req: Request, res: Response, next: NextFunction) {
    todoService.getTodo()
    .then((data) => res.json(data))
    .catch((err) => next(err))
  }