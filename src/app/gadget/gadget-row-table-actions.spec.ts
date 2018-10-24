import {GadgetService} from './gadget.service';
import {GadgetRowTableActions} from './gadget-row-table-actions';
import {async, TestBed} from '@angular/core/testing';
import {Gadget} from './gadget';
import {Observable} from 'rxjs';

describe('gadgetRowTableActions', () => {
  let gadgetRow: GadgetRowTableActions;
  let gadgetService: GadgetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: GadgetService, useClass: GadgetServiceMock}
      ]
    });
    gadgetService = TestBed.get(GadgetService);
    gadgetRow = new GadgetRowTableActions(new GadgetMock(), gadgetService);
  }));

  class GadgetMock implements Gadget {
    id: string;
    type: string;
    specifications: string;
  }

  class GadgetServiceMock {
    constructor() {

    }

    public saveGadget(gadget: Gadget): Observable<any> {
      return new Observable(o => {
        o.next(new GadgetMock());
        o.complete();
      });
    }
  }

  describe('on start editing', () => {
    it('should be editing status true', () => {
      expect(gadgetRow.editing).toEqual(false);
      gadgetRow.startEdit();
      expect(gadgetRow.editing).toEqual(true);
    });
    it('should be focus status true', () => {
      expect(gadgetRow.focus).toEqual(false);
      gadgetRow.startEdit();
      expect(gadgetRow.focus).toEqual(true);
    });
  });

  describe('on editing confirmed', () => {
    it('should be editing status false', () => {
      gadgetRow.confirmEditCreate(new GadgetMock());
      expect(gadgetRow.editing).toEqual(false);
    });
    it('should be focus status false', () => {
      gadgetRow.confirmEditCreate(new GadgetMock());
      expect(gadgetRow.focus).toEqual(false);
    });
  });
});
