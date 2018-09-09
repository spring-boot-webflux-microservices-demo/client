import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {UserService} from './user.service';
import {catchError, finalize} from 'rxjs/operators';
import {UserRow} from './user-row';
import {EmptyUser} from './empty-user';

export class UserDatasource implements DataSource<UserRow> {
  private userRows: UserRow[];

  private usersSubject = new BehaviorSubject<UserRow[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private emptyUserRow: UserRow;

  constructor(private userService: UserService) {
  }

  getAllUsersInTable() {
    this.userService.getAll().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(users => {
        this.userRows = users.map(a => new UserRow(a, this.userService));
        this.usersSubject.next(this.userRows);
      });
  }
  addUserIntoTable(newUser) {
    console.log('new table row should be added');
    this.emptyUserRow = new UserRow(new EmptyUser, this.userService);
    this.emptyUserRow.editing = true;
    this.emptyUserRow.focus = true;
    this.userRows.push(this.emptyUserRow);
    this.usersSubject.next(this.userRows);
    /*this.userService.saveUser(newUser).subscribe(saved => {
      this.usersSubject.next(saved);
      this.getAllUsersInTable();
    });*/
  }

  connect(collectionViewer: CollectionViewer): Observable<UserRow[]> {
    console.log('Connecting to datasource');
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('Disconnecting from datasource');
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

}
