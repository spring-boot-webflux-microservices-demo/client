import {async, TestBed} from '@angular/core/testing';

import {GadgetListComponent} from './gadget-list.component';
import {GadgetService} from '../gadget/gadget.service';
import {Observable} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GadgetListComponent', () => {
  let gadgetListComponent;
  let gadgetService;
  let gadgetServiceGetAllSpy;

  beforeEach(async(() => {
    gadgetService = jasmine.createSpyObj('GadgetService', ['getAll']);
    gadgetServiceGetAllSpy = gadgetService.getAll.and.returnValue(
      new Observable(o => {
        o.next([{
          id: 'id',
          type: 'type',
          specifications: 'spec'
        }]);
        o.complete();
      }));

    TestBed.configureTestingModule({
      providers: [
        gadgetService,
        GadgetListComponent,
        HttpClientTestingModule,
        {provide: GadgetService, useValue: gadgetService}
      ]
    });
  }));

  it('should get all gadgets on init', () => {
    gadgetListComponent = new GadgetListComponent(gadgetService);
    gadgetListComponent.ngOnInit();
    expect(gadgetServiceGetAllSpy.calls.any()).toBe(true, 'gadget service getAll was called');
  });
});
