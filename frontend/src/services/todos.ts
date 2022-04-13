import http from '../utils/http';
import Todos from '../domain/todos';
import endpoints from '../constants/endpoints';

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
