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
        const mockResponse = [{
          id: 'id',
          firstName: 'firstName',
          lastName: 'lastName',
          age: '55'
        }];
        const mockUrl = '//localhost:8081/api1/findAllUsers';

        service.getAll().subscribe(data => {
          expect(data).toEqual(mockResponse);
        });

        const mockRequest = httpMock.expectOne((req: HttpRequest<any>) => req.url === mockUrl);
        expect(mockRequest.request.method).toBe('GET');
        mockRequest.flush(mockResponse);
      })
  );

  it('should save user', () => {
    const userService = TestBed.get(UserService);
    const http = TestBed.get(HttpTestingController);
    let expectedResponse = null;

    userService.saveUser(new UserMock()).subscribe(data => {
      expectedResponse = data;
    });

    const responseMock = {id: 'savedId', firstName: 'savedFirstName', lastName: 'savedLastName', age: 1};
    http.expectOne({
      url: '//localhost:8081/api1/saveUser',
      method: 'POST'
    }).flush(responseMock);

    expect(expectedResponse).toEqual(responseMock);
  });

  class UserMock implements User {
    constructor();
    constructor(public id: string, public firstName: string, public lastName: string, public age: number) {
    }
  }
});
