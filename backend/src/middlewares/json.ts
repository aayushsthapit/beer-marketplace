import _isEmpty from 'lodash/isEmpty';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle empty JSON body requests and other edge cases if any.
 *
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 */
export default function json(request: Request, response: Response, next: NextFunction) {
  const { body, method } = request;
  const disallowedHttpHeaders = ['PUT', 'POST', 'PATCH'];

  if (request.is('application/json') && disallowedHttpHeaders.includes(method) && _isEmpty(body)) {
    throw new Error('Empty JSON');
  }

  next();
}
