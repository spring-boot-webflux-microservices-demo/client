import {UserActions} from './user-actions';
import {User} from './user';

export class UserRow implements User, UserActions {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  editing: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.age = user.age;
  }

  cancel(): void {
  }

  confirmEditCreate(): boolean {
    console.log('edit confirmed');
    this.editing = false;
    return false;
  }

  delete(): void {
  }

  startEdit(): void {
    console.log('editing mode');
    this.editing = true;
  }
}
