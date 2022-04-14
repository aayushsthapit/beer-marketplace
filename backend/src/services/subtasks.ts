import Todos from '../models/todos';
import Subtasks from '../models/subtasks';
import { Status } from '../constants/enums';
import SubtasksInterface from '../domain/subtasks';

interface SubtaskRequestParams {
    title: string;
    todosId: number;
}

/**
 * Create a new subtask associated with an existing todo item.
 *
 * @param {SubtaskRequestParams} params
 * @returns {Promise<SubtasksInterface>}
 */
export async function createSubtask(params: SubtaskRequestParams):Promise<SubtasksInterface> {
    const { todosId } = params;
    const insertParams = {
        ...params,
        status: Status.PENDING
    }

    // Validate if the associated todo exists.
    await Todos.query().findById(todosId).throwIfNotFound();
    const subtask = await Subtasks.query().insert(insertParams);

    return subtask;
}
