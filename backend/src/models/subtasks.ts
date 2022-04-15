import { Model } from 'objection';

import { Status } from '../constants/enums';

/**
 * Model for table "subtasks"
 */
class Subtasks extends Model {
  id!: number;
  title!: string;
  status!: Status;
  createdAt!: Date;
  updatedAt!: Date;
  todosId!: number;

  static get tableName() {
    return 'subtasks';
  }
}

export default Subtasks;
