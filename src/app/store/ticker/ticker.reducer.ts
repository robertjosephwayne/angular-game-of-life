import { Action, createReducer, on } from '@ngrx/store';

import { TickerState, initialState } from './ticker.state';

import * as TickerActions from './ticker.actions';

const _tickerReducer = createReducer(
  initialState,

  on(TickerActions.setTickSpeed, (state, { newTickSpeed }) => {
    return {
      ...state,
      tickSpeed: newTickSpeed,
    };
  }),

  on(TickerActions.setTicker, (state, { newTicker }) => {
    return {
      ...state,
      activeTicker: newTicker
    };
  }),

  on(TickerActions.clearTicker, (state) => {
    return {
      ...state,
      activeTicker: null
    }
  }),

  on(TickerActions.resetTickSpeed, (state) => {
    return {
      ...state,
      tickSpeed: initialState.tickSpeed
    };
  })

);

export function tickerReducer(state: TickerState, action: Action) {
  return _tickerReducer(state, action);
}
