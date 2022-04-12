import Todo from '../models/todo';
import { convertObjListToCamelCase } from '../utils/caseConverter';

/**
 * Retrieve a list of todos and associated subtasks.
 */
export async function getTodo() {
    const todos = await Todo.query();

    return convertObjListToCamelCase(todos);
}
