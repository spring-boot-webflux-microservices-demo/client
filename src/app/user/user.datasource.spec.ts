import {async, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {UserDatasource} from './user.datasource';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {EmptyUser} from './model/empty-user';
import {UserRow} from './user-row';
import {Observable} from 'rxjs';

describe('userDatasource', () => {
  let userService;
  let userDatasource;

  const userMock = {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 55
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    userService = TestBed.get(UserService);
    userDatasource = new UserDatasource(userService);
  }));

  it('should fill table with users', () => {
    const http = TestBed.get(HttpTestingController);
    const mockResponse = [{
      id: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      age: 55
    }];

    userDatasource.getAllUsersInTable();

    http.expectOne({
      url: '//localhost:8081/api1/findAllUsers',
      method: 'GET'
    }).flush(mockResponse);

    expect(userDatasource).not.toBeNull();
    expect(userDatasource.usersSubject.getValue()[0].user).toEqual(userMock);
  });

  it('should add empty user with active editing and focus statuses', () => {
    userDatasource.addEmptyUser();
    expect(userDatasource.usersSubject.getValue()[0].user).toEqual(new EmptyUser());
    expect(userDatasource.usersSubject.getValue()[0].editing).toEqual(true);
    expect(userDatasource.usersSubject.getValue()[0].focus).toEqual(true);
  });

  it('should add user row', () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['saveUser']);
    const userRow = new UserRow(userMock, userServiceSpy);
    const userServiceSaveUserSpy = userServiceSpy.saveUser.and.returnValue(new Observable(o => {
      o.next(userMock);
      o.complete();
    }));
    userRow.user.id = undefined;
    userDatasource = new UserDatasource(userServiceSpy);
    userDatasource.add(userRow);
    expect(userServiceSaveUserSpy.calls.any()).toBe(true);
    expect(userRow.editing).toEqual(false);
    expect(userRow.focus).toEqual(false);
  });

});
