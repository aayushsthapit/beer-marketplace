import { Model } from 'objection';

import { Status } from '../constants/enums';

/**
 * Model for table "todo"
 */
class Todo extends Model {
    id!: number;
    title!: string;
    status!: Status;
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName() {
        return 'todo';
    }
}

export default Todo;
