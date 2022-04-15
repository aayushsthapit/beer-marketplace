import Subtasks from '../subtasks';
import { Status } from '../../constants/enums';

export interface UpdateTodoParams {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  subtasks?: Subtasks[];
}
