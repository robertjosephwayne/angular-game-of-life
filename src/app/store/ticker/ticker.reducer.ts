import { Action, createReducer, on } from '@ngrx/store';

import * as TickerActions from './ticker.actions';

export interface State {
  maxTickInterval: number;
  tickSpeed: number;
  activeTicker: any;
}

export const initialState: State = {
  maxTickInterval: 1000,
  tickSpeed: 500,
  activeTicker: null
};

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

export function tickerReducer(state: State, action: Action) {
  return _tickerReducer(state, action);
}
