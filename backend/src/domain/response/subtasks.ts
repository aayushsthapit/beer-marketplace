import Subtasks from '../subtasks';
import { Status } from '../../constants/enums';

export interface UpdateSubtask {
    subtask: Subtasks,
    todoStatus?: Status;
}
