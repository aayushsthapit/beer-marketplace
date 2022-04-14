import Todos from '../models/todos';
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
    }
    const todos = await Todos.query().insert(insertParams);

    return {
        ...todos,
        subtasks: []
    };
}
