import {async} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let appComponent;

  beforeEach(async(() => {
    appComponent = new AppComponent();
  }));

  it(`should have as title 'client'`, () => {
    expect(appComponent.title).toEqual('client');
  });

  it('should have user title', () => {
    expect(appComponent.userTitle).toEqual('User');
  });

  it('should have user description', () => {
    expect(appComponent.userDescription).toEqual('User content');
  });

  it( 'should have gadget title', () => {
    expect(appComponent.gadgetTitle).toEqual('Gadget');
  });

  it('should have gadget description', () => {
    expect(appComponent.gadgetDescription).toEqual('Gadget content');
  });
});
