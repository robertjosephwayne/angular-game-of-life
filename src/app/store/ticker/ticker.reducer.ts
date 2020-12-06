import { Action, createReducer, on } from '@ngrx/store';

import * as TickerActions from './ticker.actions';

export interface State {
  maxTickInterval: number;
  tickInterval: number;
  activeTicker: any;
  randomLifeActive: boolean;
}

export const initialState: State = {
  maxTickInterval: 1000,
  tickInterval: 500,
  activeTicker: null,
  randomLifeActive: false
};

const _tickerReducer = createReducer(
  initialState,

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

  on(TickerActions.setTickInterval, (state, { newTickInterval }) => {
    return {
      ...state,
      tickInterval: newTickInterval,
    };
  }),

  on(TickerActions.resetTickInterval, (state) => {
    return {
      ...state,
      tickInterval: initialState.tickInterval
    };
  }),

  on(TickerActions.emptyGenerationCheck, (state) => {
    return {
      ...state
    };
  }),

  on(TickerActions.activateRandomLife, (state) => {
    return {
      ...state,
      randomLifeActive: true
    };
  }),

  on(TickerActions.disableRandomLife, (state) => {
    return {
      ...state,
      randomLifeActive: false
    };
  })
);

export function tickerReducer(state: State, action: Action) {
  return _tickerReducer(state, action);
}
