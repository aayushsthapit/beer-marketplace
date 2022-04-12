import Todos from '../models/todos';
import TodosInterface from '../domain/todos';
import SubtasksInterface from '../domain/subtasks';

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
