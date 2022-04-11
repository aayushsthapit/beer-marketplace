import { Model } from 'objection';

class User extends Model {
  id!: number;
  name!: string;

  static get tableName() {
    return 'users';
  }
}

export default User;
