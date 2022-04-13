import { Request, Response, Router } from 'express';

import * as appPackage from '../package.json';
import * as todosController from './controllers/todos';
import { todoCreateSchema } from './schema/todo';
import { validateSchema } from './middlewares/validate';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ [appPackage.name]: appPackage.version });
});

router.get('/todos', todosController.getTodos);
router.post('/todos', validateSchema(todoCreateSchema), todosController.getTodos)

export default router;
