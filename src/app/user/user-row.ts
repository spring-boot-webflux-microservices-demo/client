import {UserActions} from './model/user-actions';
import {User} from './model/user';
import {UserService} from './user.service';

export class UserRow implements UserActions {
  editing: boolean;
  focus: boolean;

  constructor(public user: User, private userService: UserService) {
    this.editing = false;
    this.focus = false;
  }

  cancel(): void {
  }

  confirmEditCreate(updatedUser: User): boolean {
    this.editing = false;
    this.focus = false;
    this.userService.saveUser(updatedUser).subscribe();
    return false;
  }

  startEdit(): void {
    this.editing = true;
    this.focus = true;
  }

}
