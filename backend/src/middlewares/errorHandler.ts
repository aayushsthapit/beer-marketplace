import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { logger } from '../utils/logger';
import errorMessageGenerator from '../utils/errorMessageGenerator';

/**
 * Error response middleware for errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (!!err.stack) {
    logger.error(`Error stack: ${err.stack}`);
  }
  errorMessageGenerator(err, res);
}

/**
 * Method not found error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
export function methodNotFound(req: Request, res: Response) {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
}
