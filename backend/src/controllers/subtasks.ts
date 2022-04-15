import { Request, Response, NextFunction } from 'express';

import * as subtasksService from '../services/subtasks';

/**
 * Controller to create a new subtask for a given todo.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function createSubtask(req: Request, res: Response, next: NextFunction) {
  const { title, todosId } = req.body;

  return subtasksService
    .createSubtask({ title, todosId })
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Controller to update an existing subtask.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function updateSubtask(req: Request, res: Response, next: NextFunction) {
  const { subtasksId } = req.params;
  const { status } = req.body;

  return subtasksService
    .updateSubtask(+subtasksId, status)
    .then(data => res.json(data))
    .catch(err => next(err));
}
