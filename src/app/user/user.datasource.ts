import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {User} from './user';
import {BehaviorSubject, Observable, of, pipe} from 'rxjs';
import {UserService} from './user.service';
import {catchError, finalize} from 'rxjs/operators';

export class UserDatasource implements DataSource<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {
  }

  getAllUsersInTable() {
    this.userService.getAll().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(u => {
        this.usersSubject.next(u);
      });
  }


  addUserIntoTable(newUser) {
    this.userService.saveUser(newUser).subscribe(saved => {
      this.usersSubject.next(saved);
      this.getAllUsersInTable();
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    console.log('Connecting to datasource');
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('Disconnecting from datasource');
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

}
