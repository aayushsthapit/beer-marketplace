import { Request, Response, Router } from 'express';

import * as appPackage from '../../package.json';
import * as todoController from '../controllers/todo';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ [appPackage.name]: appPackage.version });
});

router.get('/todo', todoController.getTodo);

export default router;
