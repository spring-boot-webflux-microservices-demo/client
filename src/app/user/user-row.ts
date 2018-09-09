import {UserActions} from './user-actions';
import {User} from './user';

export class UserRow implements UserActions {
  user: User;
  editing: boolean;

  constructor(user: User) {
    this.user = user;
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
