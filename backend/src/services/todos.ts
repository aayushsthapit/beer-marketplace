import Todos from '../models/todos';
import TodosInterface from '../domain/todos';
import SubtasksInterface from '../domain/subtasks';

import { Status } from '../constants/enums';
import { convertObjListToCamelCase } from '../utils/caseConverter';

/**
 * Retrieve a list of todos and associated subtasks.
 *
 * @returns {Promise<TodosInterface[]>}
 */
export async function getTodos(): Promise<TodosInterface[]> {
    const todos: TodosInterface[] = await Todos.getTodos();

    return convertObjListToCamelCase<TodosInterface>(
        todos.map(todo => ({
            ...todo,
            subtasks: convertObjListToCamelCase<SubtasksInterface>(todo.subtasks)
        })
        ));
}

/**
 * Creates a new todo item.
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
