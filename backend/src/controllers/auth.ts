
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as AuthService from '../services/auth';

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  return AuthService.signUp()
    .then(data => res.sendStatus(HttpStatus.CREATED))
    .catch(err => next(err));
};
