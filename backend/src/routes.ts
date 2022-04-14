import { Request, Response, Router } from 'express';

import * as appPackage from '../package.json';
import { todoCreateSchema } from './schema/todos';
import * as todosController from './controllers/todos';
import { subtaskCreateSchema } from './schema/subtasks';
import { validateSchema } from './middlewares/validate';
import * as subtaskController from './controllers/subtasks';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ [appPackage.name]: appPackage.version });
});

router.get('/todos', todosController.getTodos);
router.post('/todos', validateSchema(todoCreateSchema), todosController.createTodo);
router.post('/subtasks', validateSchema(subtaskCreateSchema), subtaskController.createSubtask);

export default router;
