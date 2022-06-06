import http from '../utils/http';
import Subtasks from '../domain/subtasks';
import { Status } from '../constants/enums';
import { normalize } from '../utils/normalize';
import endpoints from '../constants/endpoints';
import { UpdateTodoParams } from '../domain/responses/todo';
import Todos, { NormalizedTodos, TodosWithNormalizedSubtasks } from '../domain/todos';

/**
 * Fetch the list of todos and their associated subtasks.
 *
 * @returns {Promise<Todos[]>}
 */
export async function getTodos(): Promise<Todos[]> {
  const todos = await http.get(endpoints.todos);

  return todos.data;
}

/**
 * Create a new todo.
 *
 * @param {{title: string}} params
 * @returns {Promise<Todos>}
 */
export async function createNewTodo(params: { title: string }): Promise<Todos> {
  const todos = await http.post(endpoints.todos, params);

  return todos.data;
}

/**
 * Normalizes list of todos and underneath subtasks of each todos items.
 *
 * @param {Todos[]} todos
 * @returns {NormalizedTodos}
 */
export function getNormalizedTodoandSubtasks(todos: Todos[]): NormalizedTodos {
  const todosWithNormalizedSubtasks = todos.map((todo) => ({
    ...todo,
    subtasks: normalize<Subtasks>(todo.subtasks, 'id'),
  }));
  const normalizedTodos = normalize<TodosWithNormalizedSubtasks>(todosWithNormalizedSubtasks, 'id');

  return normalizedTodos;
}

/**
 * Updates an existing todo item.
 *
 * @param {{ status: Status, todosId: number} params
 * @returns { Promise<UpdateTodo>}
 */
export async function updateTodo(params: { status: Status; todosId: number }): Promise<UpdateTodoParams> {
  const { todosId, status } = params;
  const url = `${endpoints.todos}/${todosId}`;
  const todos = await http.patch(url, { status });

  return todos.data;
}

/**
 * Resolve todo state for an added subtask.
 *
 * @param {NormalizedTodos} todos
 * @param {Subtasks} newSubtask
 * @param {number} todosId
 * @returns {NormalizedTodos}
 */
export function resolveStateForAddedSubtask(
  todos: NormalizedTodos,
  newSubtask: Subtasks,
  todosId: number
): NormalizedTodos {
  return {
    ...todos,
    [todosId]: {
      ...todos[todosId],
      subtasks: {
        ...todos[todosId].subtasks,
        [newSubtask.id]: newSubtask,
      },
    },
  };
}

/**
 * Resolve todo state for an updated todo item.
 *
 * @param {NormalizedTodos} todos
 * @param {UpdateTodoParams} updatedTodo
 * @param {number} todosId
 * @returns {NormalizedTodos}
 */
export function resolveStateForUpdatedTodo(
  todos: NormalizedTodos,
  updatedTodo: UpdateTodoParams,
  todosId: number
): NormalizedTodos {
  const normalizedSubtasks = updatedTodo.subtasks && normalize(updatedTodo.subtasks, 'id');

  return {
    ...todos,
    [todosId]: {
      ...todos[todosId],
      ...updatedTodo,
      ...(normalizedSubtasks && { subtasks: normalizedSubtasks }),
    },
  };
}
