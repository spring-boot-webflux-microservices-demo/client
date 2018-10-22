import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {UserService} from './user.service';
import {catchError, finalize} from 'rxjs/operators';
import {UserRowTableActions} from './user-row-table-actions';
import {EmptyUser} from './model/empty-user';
import {User} from './model/user';

export class UserDatasource implements DataSource<UserRowTableActions> {
  public usersSubject = new BehaviorSubject<UserRowTableActions[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private emptyUserRow: UserRowTableActions;
  private userRows: UserRowTableActions[];

  constructor(private userService: UserService) {
    this.userRows = [];
  }

  getAllUsersInTable() {
    this.userService.getAll().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(users => {
        this.userRows = users.map(a => new UserRowTableActions(a, this.userService));
        this.usersSubject.next(this.userRows);
      });
  }

  addEmptyUser() {
    this.emptyUserRow = new UserRowTableActions(new EmptyUser, this.userService);
    this.emptyUserRow.editing = true;
    this.emptyUserRow.focus = true;
    this.userRows.push(this.emptyUserRow);
    this.usersSubject.next(this.userRows);
  }

  add(row: UserRowTableActions): void {
    row.editing = false;
    row.focus = false;
    row.user.id === undefined ? this.saveNewUser(row.user) : this.updateExistingUser(row.user);
  }

  private saveNewUser(user: User): void {
    this.userService.saveUser(user).subscribe();
  }

  private updateExistingUser(user: User): void {
    this.userService.updateUser(user).subscribe();
  }

  delete(user: User): void {
    this.userService.deleteUser(user).subscribe(() => {
      this.userRows = this.userRows.filter(item => item.user !== user);
      this.usersSubject.next(this.userRows);
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<UserRowTableActions[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

}
