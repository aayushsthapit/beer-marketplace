import { Status } from '../constants/enums';
import Subtasks, { NormalizedSubtasks } from './subtasks';

interface Todos {
    id: number;
    title: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    subtasks: Subtasks[];
}

export interface TodosWithNormalizedSubtasks extends Omit<Todos, 'subtasks'> {
    subtasks: NormalizedSubtasks
}

export interface NormalizedTodos {
    [key: number]: TodosWithNormalizedSubtasks
}

export default Todos;
