import {UserRowTableActions} from './user-row-table-actions';
import {async, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {User} from './model/user';

describe('UserRowTableActions', () => {

  let userRow: UserRowTableActions;
  let userService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useClass: UserServiceMock}
      ]
    });
    userService = TestBed.get(UserService);
    userRow = new UserRowTableActions(new UserMock(), userService);
  }));

  class UserMock implements User {
    age: number;
    firstName: string;
    id: string;
    lastName: string;
  }

  class UserServiceMock {
    constructor() {
    }

    public saveUser(user: User): Observable<any> {
      return new Observable(o => {
        o.next(new UserMock);
        o.complete();
      });
    }
  }

  describe('on start editing', () => {
    it('should be editing status true', () => {
      expect(userRow.editing).toEqual(false);
      userRow.startEdit();
      expect(userRow.editing).toEqual(true);
    });

    it('should be focus status true', () => {
      expect(userRow.focus).toEqual(false);
      userRow.startEdit();
      expect(userRow.focus).toEqual(true);
    });
  });

  describe('on editing confirmed', () => {
    it('should be editing status false', () => {
      userRow.confirmEditCreate(new UserMock());
      expect(userRow.editing).toEqual(false);
    });
    it('should be focus status false', () => {
      userRow.confirmEditCreate(new UserMock());
      expect(userRow.focus).toEqual(false);
    });
  });
});
