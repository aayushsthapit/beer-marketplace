import http from '../utils/http';
import Subtasks from '../domain/subtasks';
import { Status } from '../constants/enums';
import endpoints from '../constants/endpoints';
import { UpdateSubtask } from '../domain/responses/subtasks';

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

/**
 * Updates an existing subtask item.
 *
 * @param {{ status: Status, subtaskId: number} params
 * @returns { Promise<UpdateSubtask>}
 */
export async function updateSubtask(params: { status: Status, subtaskId: number }): Promise<UpdateSubtask> {
    const { subtaskId, status } = params;
    const url = `${endpoints.subtasks}/${subtaskId}`;
    const todos = await http.patch(url, { status });

    return todos.data;
}
