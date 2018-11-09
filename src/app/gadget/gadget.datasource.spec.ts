import {async, TestBed} from '@angular/core/testing';
import {GadgetService} from './gadget.service';
import {GadgetDatasource} from './gadget.datasource';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {EmptyGadget} from './empty-gadget';
import {Observable} from 'rxjs';
import {GadgetTableRow} from './gadget-table-row';

describe('gadgetDatasource', () => {
  let gadgetService;
  let gadgetDatasource;

  const gadgetMock = {
    id: 'id',
    type: 'type',
    specifications: 'specifications'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    gadgetService = TestBed.get(GadgetService);
    gadgetDatasource = new GadgetDatasource(gadgetService);
  }));

  it('should fill table with gadgets', () => {
    const http = TestBed.get(HttpTestingController);
    const mockResponse = [{
      id: 'id',
      type: 'type',
      specifications: 'specifications'
    }];

    gadgetDatasource.getAllGadgetsInTable();

    http.expectOne({
      url: '//localhost:8082/api2/findAllGadgets',
      method: 'GET'
    }).flush(mockResponse);

    expect(gadgetDatasource).not.toBeNull();
    expect(gadgetDatasource.gadgetSubject.getValue()[0].gadget).toEqual(gadgetMock);
  });

  it('should add empty gadget with active editing and focus statuses', () => {
    gadgetDatasource.addEmptyGadget();
    expect(gadgetDatasource.gadgetSubject.getValue()[0].gadget).toEqual(new EmptyGadget());
    expect(gadgetDatasource.gadgetSubject.getValue()[0].editing).toEqual(true);
    expect(gadgetDatasource.gadgetSubject.getValue()[0].focus).toEqual(true);
  });

  it('should add gadget row', () => {
    const gadgetServiceSpy = jasmine.createSpyObj('GadgetService', ['saveGadget']);
    const gadgetRow = new GadgetTableRow(gadgetMock);
    const gadgetServiceSaveGadgetSpy = gadgetServiceSpy.saveGadget.and.returnValue(new Observable(o => {
      o.next(gadgetMock);
      o.complete();
    }));
    gadgetRow.gadget.id = undefined;
    gadgetDatasource = new GadgetDatasource(gadgetServiceSpy);
    gadgetDatasource.add(gadgetRow);
    expect(gadgetServiceSaveGadgetSpy.calls.any()).toBe(true);
    expect(gadgetRow.editing).toEqual(false);
    expect(gadgetRow.focus).toEqual(false);
  });

  it('should update existing gadget row', () => {
    const gadgetServiceSpy = jasmine.createSpyObj('GadgetService', ['updateGadget']);
    const gadgetRow = new GadgetTableRow(gadgetMock);
    const gadgetServiceUpdateGadgetSpy = gadgetServiceSpy.updateGadget.and.returnValue(new Observable(o => {
      o.next(gadgetMock);
      o.complete();
    }));
    gadgetRow.gadget.id = 'existingId';
    gadgetDatasource = new GadgetDatasource(gadgetServiceSpy);
    gadgetDatasource.add(gadgetRow);
    expect(gadgetServiceUpdateGadgetSpy.calls.any()).toBe(true);
    expect(gadgetRow.editing).toEqual(false);
    expect(gadgetRow.focus).toEqual(false);
  });

});
