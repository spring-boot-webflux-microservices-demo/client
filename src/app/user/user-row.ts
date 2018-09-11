import {UserActions} from './user-actions';
import {User} from './user';
import {UserService} from './user.service';

export class UserRow implements UserActions {
  editing: boolean;
  focus: boolean;

  constructor(public user: User, private userService: UserService) {
  }

  cancel(): void {
  }

  confirmEditCreate(updatedUser: User): boolean {
    this.editing = false;
    this.focus = false;
    this.userService.saveUser(updatedUser).subscribe(saved => {
      // this.usersSubject.next(saved);
      // this.getAllUsersInTable();
    });
    return false;
  }

  startEdit(): void {
    console.log('editing mode');
    this.editing = true;
    this.focus = true;
  }

}
