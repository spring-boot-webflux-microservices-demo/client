import {TestBed} from '@angular/core/testing';

import {GadgetService} from './gadget.service';
import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GadgetService', () => {
  let gadgetService;
  let http;
  let response;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        HttpClientTestingModule]
    });

    gadgetService = TestBed.get(GadgetService);
    http = TestBed.get(HttpTestingController);
    response = null;
  });

  it('should return all gadgets', () => {
    gadgetService.getAll().subscribe(data => response = data);
    const mockRequest = http.expectOne((req: HttpRequest<any>) => req.url === '//localhost:8082/api2/findAllGadgets')
    mockRequest.flush({id: 'mockedId'});
    expect(response).toEqual({id: 'mockedId'});
    expect(mockRequest.request.method).toBe('GET');
  });
});
