import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetListComponent } from './gadget-list.component';

describe('GadgetListComponent', () => {
  let component: GadgetListComponent;
  let fixture: ComponentFixture<GadgetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GadgetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
