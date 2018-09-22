import {TestBed, inject} from '@angular/core/testing';

import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {User} from './user';

describe(`FakeHttpClientResponses`, () => {

  const userMock = {
    id: 'mockId',
    firstName: 'mockFirstName',
    lastName: 'mockLastName',
    age: 0
  };

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

    userService.saveUser(new EmptyUserMock()).subscribe(data => {
      response = data;
    });

    http.expectOne({
      url: '//localhost:8081/api1/saveUser',
      method: 'POST'
    }).flush(userMock);

    expect(response).toEqual(userMock);
  });

  it('should update user', inject([UserService, HttpTestingController],
    (userService: UserService, http: HttpTestingController) => {
      let response = null;

      userService.updateUser(userMock).subscribe(data => {
        response = data;
      });

      http.expectOne({
        url: '//localhost:8081/api1/updateUser/' + userMock.id,
        method: 'PUT'
      }).flush(userMock);

      expect(response).toEqual(userMock);
    }
  ));

  it('should delete user', inject([UserService, HttpTestingController],
    (userService: UserService, http: HttpTestingController) => {
      let response = null;

      userService.deleteUser(userMock).subscribe(() => response = userMock);

      http.expectOne({
          url: '//localhost:8081/api1/deleteUser/' + userMock.id,
          method: 'DELETE'
        }
      ).flush(userMock);

      expect(response).toEqual(userMock);
    }));

  class EmptyUserMock implements User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;

    constructor() {
    }
  }

})
;
