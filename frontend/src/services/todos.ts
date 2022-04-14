import http from '../utils/http';
import Subtasks from '../domain/subtasks';
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
