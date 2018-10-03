import {TestBed} from '@angular/core/testing';

import {GadgetService} from './gadget.service';
import {HttpClientModule, HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GadgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        HttpClientTestingModule]
    });
  });

  it('should return all gadgets', () => {
    const gadgetService = TestBed.get(GadgetService);
    const http = TestBed.get(HttpTestingController);
    let response = null;

    gadgetService.getAll().subscribe(data => response = data);

    const mockRequest = http.expectOne((req: HttpRequest<any>) => req.url === '//localhost:8082/api2/findAllGadgets')
    mockRequest.flush({id: 'mockedId'});

    expect({id: 'mockedId'}).toEqual(response);
    expect(mockRequest.request.method).toBe('GET');
  });
});
