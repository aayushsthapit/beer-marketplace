import { Model } from 'objection';

import Subtasks from './subtasks';
import { Status } from '../constants/enums';
import TodosInterface from '../domain/todos';

/**
 * Model for table "todos"
 */
class Todos extends Model {
    id!: number;
    title!: string;
    status!: Status;
    createdAt!: Date;
    updatedAt!: Date;
    subtasks: any; //FIX-ME

    static get tableName() {
        return 'todos';
    }

    static relationMappings = {
        subtasks: {
          relation: Model.HasManyRelation,
          modelClass: Subtasks,
          join: {
            from: 'todos.id',
            to: 'subtasks.todos_id'
          }
        }
    }

    static getTodos(): Promise<TodosInterface[]> {
      return this.query().withGraphFetched('subtasks');
  }
}

export default Todos;
