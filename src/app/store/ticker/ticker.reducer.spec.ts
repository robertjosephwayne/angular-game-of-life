import { INIT } from '@ngrx/store';

import * as TickerActions from './ticker.actions';
import { tickerReducer } from './ticker.reducer';
import { initialState, TickerState } from './ticker.state';

describe('Ticker Reducer', () => {

  describe('Ticker Actions', () => {

    describe('init action', () => {

      it('should return the initial state', () => {
        const nextState = tickerReducer(
          undefined,
          { type: INIT }
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('unknown action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          {} as any
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('startTicking action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          TickerActions.startTicking()
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('manualTick action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          TickerActions.manualTick()
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('pause action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          TickerActions.pause()
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('setTickSpeed action', () => {

      it('should set the tick speed to the specified tick speed', () => {
        const state: TickerState = {
          ...initialState,
          tickSpeed: 500
        };

        const newTickSpeed = 100;

        const nextState = tickerReducer(
          state,
          TickerActions.setTickSpeed({ newTickSpeed })
        );

        expect(nextState.tickSpeed).toEqual(newTickSpeed);
      });

    });

    describe('updateActiveTickInterval action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          TickerActions.updateActiveTickInterval()
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('stopTicking action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          TickerActions.stopTicking()
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('setTicker action', () => {

      it('should set the active ticker to the specified ticker', () => {
        const state: TickerState = {
          ...initialState,
          activeTicker: null
        };

        const newTicker = setInterval(() => {
          return;
        });

        const nextState = tickerReducer(
          state,
          TickerActions.setTicker({ newTicker })
        );

        expect(nextState.activeTicker).toEqual(newTicker);
      });

    });

    describe('clearTicker action', () => {

      it('should set the active ticker to null', () => {
        const activeTicker = setInterval(() => {
          return;
        });

        const state: TickerState = {
          ...initialState,
          activeTicker
        };



        const nextState = tickerReducer(
          state,
          TickerActions.clearTicker()
        );

        expect(nextState.activeTicker).toBeNull();
      });

    });

    describe('autoTick action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          TickerActions.autoTick()
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('resetTickSpeed action', () => {

      it('should set the tick speed to the tick speed from the initial state', () => {
        const state: TickerState = {
          ...initialState,
          tickSpeed: 25
        };

        const nextState = tickerReducer(
          state,
          TickerActions.resetTickSpeed()
        );

        expect(nextState.tickSpeed).toEqual(initialState.tickSpeed);
      });

    });

    describe('tick action', () => {

      it('should return the previous state', () => {
        const nextState = tickerReducer(
          initialState,
          TickerActions.tick()
        );

        expect(nextState).toBe(initialState);
      });

    });

  });

});
