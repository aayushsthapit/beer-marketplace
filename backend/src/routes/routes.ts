import { Request, Response, Router } from 'express';

import * as appPackage from '../../package.json';
import * as todosController from '../controllers/todos';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ [appPackage.name]: appPackage.version });
});

router.get('/todos', todosController.getTodos);

export default router;
