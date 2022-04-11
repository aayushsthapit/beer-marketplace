import { Request, Response, NextFunction, Router } from 'express';

import * as appPackage from '../../package.json';
import * as usersService from '../services/users';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ [appPackage.name]: appPackage.version });
});

router.get('/users', (req: Request, res: Response, next: NextFunction) => {
  usersService.fetch()
  .then((data) => res.json(data))
  .catch((err) => next(err))
})

router.get('/test', (req: Request, res: Response) => {
  const response = { a: 'ssd' };
  res.json(response);
  
});

export default router;
