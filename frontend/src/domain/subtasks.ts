import { Status } from '../constants/enums';

interface Subtasks {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  todosId: number;
}

export interface NormalizedSubtasks {
  [key: number]: Subtasks;
}

export default Subtasks;
