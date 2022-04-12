import { Model } from 'objection';

import { Status } from '../constants/enums';

/**
 * Model for table "todos"
 */
class Todos extends Model {
    id!: number;
    title!: string;
    status!: Status;
    createdAt!: Date;
    updatedAt!: Date;

    static get tableName() {
        return 'todos';
    }
}

export default Todos;
