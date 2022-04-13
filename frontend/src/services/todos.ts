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
