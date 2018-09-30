import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {UserDatasource} from './user.datasource';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('userDatasource', () => {

  const userMock = {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 55
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
  });

  it('should fill table with users', () => {
    const userService = TestBed.get(UserService);
    const userDatasource = new UserDatasource(userService);
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

});
