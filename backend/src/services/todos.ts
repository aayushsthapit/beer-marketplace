import Todos from '../models/todos';
import Subtasks from '../models/subtasks';
import { Status } from '../constants/enums';
import TodosInterface from '../domain/todos';

/**
 * Retrieve a list of todos and associated subtasks.
 *
 * @returns {Promise<TodosInterface[]>}
 */
export async function getTodos(): Promise<TodosInterface[]> {
  const todos: TodosInterface[] = await Todos.getTodos();

  return todos;
}

/**
 * Create a new todo item.
 *
 * @param {string} title
 * @returns {Promise<TodosInterface>}
 */
export async function createTodo(title: string): Promise<TodosInterface> {
  const insertParams = {
    title,
    status: Status.PENDING
  };
  const todos = await Todos.query().insert(insertParams);

  return {
    ...todos,
    subtasks: []
  };
}

/**
 * Updates an existing todo item.
 * Also marks all underlying subtasks as completed if parent todo is marked as complete.
 *
 * @param {number} todosId
 * @param {Status} status
 */
export async function updateTodo(todosId: number, status: Status) {
  let updatedTodo;

  if (status === Status.COMPLETED) {
    await Subtasks.query()
      .patch({ status })
      .where({ todosId });

    updatedTodo = await Todos.query()
      .findById(todosId)
      .throwIfNotFound()
      .patch({
        status
      })
      .returning('*')
      .withGraphFetched('subtasks');

    return updatedTodo;
  }

  updatedTodo = await Todos.query()
    .findById(todosId)
    .throwIfNotFound()
    .patch({
      status
    })
    .returning('*');

  return updatedTodo;
}
