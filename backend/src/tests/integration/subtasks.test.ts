import Knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';

import Todos from '../../models/todos';
import knexConfig from '../../../knexfile';
import { Status } from '../../constants/enums';
import TodosInterface from '../../domain/todos';
import { updateSubtask } from '../../services/subtasks';

const knex = Knex({
  ...knexConfig,
  ...knexSnakeCaseMappers()
});
const testSubtaskElemId = 1;

beforeAll(() => {
  Model.knex(knex);
});

afterAll(async () => {
  await knex.destroy();
});

describe('Updating the status of subtask to pending', () => {
  test('it should set the status of parent todo as pending', async () => {
    const updatedSubTask = await updateSubtask(testSubtaskElemId, Status.PENDING);
    const {
      subtask: { todosId }
    } = updatedSubTask;
    const todo = (await Todos.query().findById(todosId)) as TodosInterface;

    expect(todo.status).toEqual(Status.PENDING);
  });
});
