import http from '../utils/http';
import Subtasks from '../domain/subtasks';
import endpoints from '../constants/endpoints';

/**
 * Create a new subtask for an existing todo.
 *
 * @param {{title: string, todosId: number}} params
 * @returns {Promise<Subtasks>}
 */
export async function createNewSubtask(params: { title: string, todosId: number }): Promise<Subtasks> {
    const subtask = await http.post(endpoints.subtasks, params);

    return subtask.data;
}
