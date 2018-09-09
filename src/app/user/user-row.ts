import {UserActions} from './user-actions';
import {User} from './user';
import {UserService} from './user.service';

export class UserRow implements UserActions {
  editing: boolean;

  constructor(private user: User, private userService: UserService) {
    this.user = user;
    this.userService = userService;
  }

  cancel(): void {
  }

  confirmEditCreate(updatedUser: User): boolean {
    console.log('edit confirmed');
    console.log(updatedUser);
    this.editing = false;
    this.userService.saveUser(updatedUser).subscribe(saved => {
      console.log('saved successfully: ');
      console.log(saved);
      // this.usersSubject.next(saved);
      // this.getAllUsersInTable();
    });
    return false;
  }

  delete(): void {
  }

  startEdit(): void {
    console.log('editing mode');
    this.editing = true;
  }

}
