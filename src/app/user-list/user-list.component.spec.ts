import {async, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {UserService} from '../user/user.service';
import {UserDatasource} from '../user/user.datasource';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';

describe('UserListComponent', () => {

  let userListComponent;
  let userService;
  let userServiceGetAllSpy;

  beforeEach(async(() => {

    userService = jasmine.createSpyObj('UserService', ['getAll']);
    userServiceGetAllSpy = userService.getAll.and.returnValue(Observable.create([{
      id: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      age: 0
    }]));

    TestBed.configureTestingModule({
      providers: [UserDatasource,
        UserListComponent,
        HttpClientTestingModule,
        {provide: UserService, useValue: userService}
      ]
    });

  }));

  it('should create', () => {
    userListComponent = new UserListComponent(userService);
    userListComponent.ngOnInit();
    expect(userServiceGetAllSpy.calls.any()).toBe(true, 'userService getAll was called');
  });
});
