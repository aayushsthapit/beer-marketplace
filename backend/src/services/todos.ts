import Todos from '../models/todos';
import { convertObjListToCamelCase } from '../utils/caseConverter';

/**
 * Retrieve a list of todos and associated subtasks.
 */
export async function getTodos() {
    const todos = await Todos.query();

    return convertObjListToCamelCase(todos);
}
 