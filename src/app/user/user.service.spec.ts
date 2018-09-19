import {TestBed, inject} from '@angular/core/testing';

import {HttpClientModule, HttpParams, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {User} from './user';

describe(`FakeHttpClientResponses`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should return all users',
    inject(
      [HttpTestingController, UserService],
      (httpMock: HttpTestingController, service: UserService) => {
        let response = null;
        const mockResponse = [{
          id: 'id',
          firstName: 'firstName',
          lastName: 'lastName',
          age: '55'
        }];
        const mockUrl = '//localhost:8081/api1/findAllUsers';

        service.getAll().subscribe(data => {
          response = data;
        });

        const mockRequest = httpMock.expectOne((req: HttpRequest<any>) => req.url === mockUrl);
        mockRequest.flush(mockResponse);

        expect(response).toEqual(mockResponse);
        expect(mockRequest.request.method).toBe('GET');
      })
  );

  it('should save user', () => {
    const userService = TestBed.get(UserService);
    const http = TestBed.get(HttpTestingController);
    let response = null;

    userService.saveUser(new UserMock()).subscribe(data => {
      response = data;
    });

    const responseMock = {id: 'savedId', firstName: 'savedFirstName', lastName: 'savedLastName', age: 1};
    http.expectOne({
      url: '//localhost:8081/api1/saveUser',
      method: 'POST'
    }).flush(responseMock);

    expect(response).toEqual(responseMock);
  });

  class UserMock implements User {
    constructor();
    constructor(public id: string, public firstName: string, public lastName: string, public age: number) {
    }
  }
});
