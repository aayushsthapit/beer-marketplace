import { Model } from 'objection';

import Subtasks from './subtasks';
import { Status } from '../constants/enums';
import TodosInterface from '../domain/todos';
import SubtasksInterface from '../domain/subtasks';

/**
 * Model for table "todos"
 */
class Todos extends Model {
  id!: number;
  title!: string;
  status!: Status;
  createdAt!: Date;
  updatedAt!: Date;
  subtasks: SubtasksInterface[];

  static get tableName() {
    return 'todos';
  }

  static relationMappings = {
    subtasks: {
      relation: Model.HasManyRelation,
      modelClass: Subtasks,
      join: {
        from: 'todos.id',
        to: 'subtasks.todosId'
      }
    }
  };

  // Get list of todos with associated subtasks.
  static getTodos(): Promise<TodosInterface[]> {
    return this.query().withGraphFetched('subtasks');
  }
}

export default Todos;
