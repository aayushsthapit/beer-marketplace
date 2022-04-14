import http from '../utils/http';
import Subtasks from '../domain/subtasks';
import { Status } from '../constants/enums';
import { normalize } from '../utils/normalize';
import endpoints from '../constants/endpoints';
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
    const todosWithNormalizedSubtasks = todos.map(todo => ({
        ...todo,
        subtasks: normalize<Subtasks>(todo.subtasks, 'id')
    }));
    const normalizedTodos = normalize<TodosWithNormalizedSubtasks>(todosWithNormalizedSubtasks, 'id');

    return normalizedTodos;
}

/**
 * Updates an existing todo item.
 *
 * @param {{ status: Status, todosId: number} params
 * @returns { Promise<Todos>}
 */
export async function updateTodo(params: { status: Status, todosId: number }): Promise<Todos> {
    const { todosId, status } = params;
    const url = `${endpoints.todos}/${todosId}`;
    const todos = await http.patch(url, { status });

    return todos.data;
}
