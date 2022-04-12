import Subtasks from './subtasks';
import { Status } from '../constants/enums';

interface Todos {
    id: number;
    title: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    subtasks: Subtasks[];
}

export default Todos;
