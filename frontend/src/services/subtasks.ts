import http from '../utils/http';
import Subtasks from '../domain/subtasks';
import { Status } from '../constants/enums';
import endpoints from '../constants/endpoints';
import { NormalizedTodos } from '../domain/todos';
import { UpdateSubtaskParams } from '../domain/responses/subtasks';

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
export async function updateSubtask(params: { status: Status, subtaskId: number }): Promise<UpdateSubtaskParams> {
    const { subtaskId, status } = params;
    const url = `${endpoints.subtasks}/${subtaskId}`;
    const todos = await http.patch(url, { status });

    return todos.data;
}

/**
 * Resolve todo state for an updated subtask.
 *
 * @param {NormalizedTodos} todos
 * @param {UpdateSubtaskParams} updatedSubtask
 * @param {number} subtaskId
 * @returns {NormalizedTodos}
 */
export function resolveStateForUpdatedSubtask(todos: NormalizedTodos, updatedSubtask: UpdateSubtaskParams, subtaskId: number): NormalizedTodos {
    const { subtask: { todosId }, todoStatus } = updatedSubtask;

    return {
        ...todos,
        [todosId]: {
            ...todos[todosId],
            ...(todoStatus && { status: todoStatus }),
            subtasks: {
                ...todos[todosId].subtasks,
                [subtaskId]: {
                    ...todos[todosId].subtasks[subtaskId],
                    ...updatedSubtask.subtask
                }
            }
        }
    }
}