import {TestBed, inject} from '@angular/core/testing';

import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';

describe(`FakeHttpClientResponses`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  fit(`should return all users`,
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
});
