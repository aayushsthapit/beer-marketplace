import { Request, Response, Router } from 'express';

import * as appPackage from '../package.json';
import * as todosController from './controllers/todos';
import { validateSchema } from './middlewares/validate';
import * as subtaskController from './controllers/subtasks';
import { todoCreateSchema, todoUpdateSchema } from './schema/todos';
import { subtaskCreateSchema, subtaskUpdateSchema } from './schema/subtasks';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ [appPackage.name]: appPackage.version });
});

router.get('/todos', todosController.getTodos);
router.post('/todos', validateSchema(todoCreateSchema), todosController.createTodo);
router.patch('/todos/:todosId(\\d+)',validateSchema(todoUpdateSchema), todosController.updateTodo);
router.post('/subtasks', validateSchema(subtaskCreateSchema), subtaskController.createSubtask);
router.patch('/subtasks/:subtasksId(\\d+)',validateSchema(subtaskUpdateSchema), subtaskController.updateSubtask);

export default router;
