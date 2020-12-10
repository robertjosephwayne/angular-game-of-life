import { INIT } from '@ngrx/store';

import * as TickerActions from './ticker.actions';
import { tickerReducer } from './ticker.reducer';
import { initialState, TickerState } from './ticker.state';

describe('Ticker Reducer', () => {

  describe('Ticker Actions', () => {

    describe('init action', () => {
      it('should return the initial state', () => {
        const nextState = tickerReducer(undefined, { type: INIT });
        expect(nextState).toBe(initialState);
      });
    });

    describe('unknown action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, {} as any);
        expect(nextState).toBe(initialState);
      });
    });

    describe('startTicking action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, TickerActions.startTicking());
        expect(nextState).toBe(initialState);
      });
    });

    describe('manualTick action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, TickerActions.manualTick());
        expect(nextState).toBe(initialState);
      });
    });

    describe('pause action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, TickerActions.pause());
        expect(nextState).toBe(initialState);
      });
    });

    describe('setTickSpeed action', () => {

    });

    describe('updateActiveTickInterval action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, TickerActions.updateActiveTickInterval());
        expect(nextState).toBe(initialState);
      });
    });

    describe('stopTicking action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, TickerActions.stopTicking());
        expect(nextState).toBe(initialState);
      });
    });

    describe('setTicker action', () => {

    });

    describe('clearTicker action', () => {

    });

    describe('autoTick action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, TickerActions.autoTick());
        expect(nextState).toBe(initialState);
      });
    });

    describe('resetTickSpeed action', () => {

    });

    describe('tick action', () => {
      it('should return the previous state', () => {
        const nextState = tickerReducer(initialState, TickerActions.tick());
        expect(nextState).toBe(initialState);
      });
    });

  });

});
