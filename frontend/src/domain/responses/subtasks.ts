import Subtasks from '../subtasks';
import { Status } from '../../constants/enums';

export interface UpdateSubtaskParams {
    subtask: Subtasks,
    todoStatus?: Status;
}
