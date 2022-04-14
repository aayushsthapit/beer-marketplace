import Todos from '../models/todos';
import Subtasks from '../models/subtasks';
import { Status } from '../constants/enums';
import SubtasksInterface from '../domain/subtasks';
import { UpdateSubtask } from '../domain/response/subtasks';

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
export async function createSubtask(params: SubtaskRequestParams): Promise<SubtasksInterface> {
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

/**
 * Updates an existing subtask.
 * Also marks associated parent todo as pending if a subtask is marked as pending.
 *
 * @param {number} subtaskId
 * @param {Status} status
 * @returns {Promise<UpdateSubtask>}
 */
export async function updateSubtask(subtaskId: number, status: Status): Promise<UpdateSubtask> {
    let updatedSubtask: SubtasksInterface;
    if (status === Status.PENDING) {
        updatedSubtask = await Subtasks
            .query()
            .findById(subtaskId)
            .throwIfNotFound()
            .patch({ status })
            .returning('*') as any;

        await Todos.query()
            .patch({ status })
            .where({ id: updatedSubtask.todosId });

        return {
            subtask: updatedSubtask,
            todoStatus: status
        }
    }

    updatedSubtask = await Subtasks
        .query()
        .findById(subtaskId)
        .throwIfNotFound()
        .patch({ status })
        .returning('*') as any;

    return { subtask: updatedSubtask };
}
