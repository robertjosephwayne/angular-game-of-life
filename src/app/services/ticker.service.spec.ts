import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, mockState } from '../store/app.state';

import * as TickerActions from '../store/ticker/ticker.actions';

import { TickerService } from './ticker.service';

describe('Ticker Service', () => {
  let service: TickerService;
  let store: MockStore<AppState>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    service = new TickerService(store);
  });

  describe('createAutoTicker', () => {
    it('should dispatch the createAutoTickerSuccess action', () => {
      spyOn<any>(service, 'getNewTicker').and.returnValue(5);
      service.createAutoTicker(500);
      expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.createAutoTickerSuccess({ newTicker: 5 }));
    });
  });

  describe('clearAutoTicker', () => {
    it('should clear the interval of the active ticker', () => {
      const autoTickSpy = jasmine.createSpy('autoTickSpy');
      jasmine.clock().install();

      const activeTicker = setInterval(() => {
        autoTickSpy();
      }, 1000);

      service.clearAutoTicker(activeTicker);

      jasmine.clock().tick(1001);
      expect(autoTickSpy.calls.count()).toEqual(0);
      jasmine.clock().uninstall();
    });

    it('should dispatch the clearAutoTickerSuccess action', () => {
      const activeTicker = setInterval(() => {
        return;
      }, 1000);
      service.clearAutoTicker(activeTicker);
      expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.clearAutoTickerSuccess());
    });
  });

  describe('replaceActiveAutoTicker', () => {
    it('should call clearAutoTicker with the active ticker', () => {
      const clearAutoTickerSpy = spyOn(service, 'clearAutoTicker');
      const activeTicker = setInterval(() => {
        return;
      }, 1000);
      const newTickInterval = 800;
      service.replaceActiveAutoTicker(activeTicker, newTickInterval);
      expect(clearAutoTickerSpy).toHaveBeenCalledWith(activeTicker);
    });

    it('should call createAutoTicker with the tick interval', () => {
      const createAutoTickerSpy = spyOn(service, 'createAutoTicker');
      const activeTicker = setInterval(() => {
        return;
      }, 1000);
      const newTickInterval = 800;
      service.replaceActiveAutoTicker(activeTicker, newTickInterval);
      expect(createAutoTickerSpy).toHaveBeenCalledWith(newTickInterval);
    });
  });

});
