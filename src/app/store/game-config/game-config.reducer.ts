import { Action, createReducer, on } from '@ngrx/store';

import * as GameConfigActions from './game-config.actions';

export interface State {
  maxTickInterval: number;
  autoTicking: boolean;
  tickInterval: number;
  ticker: any;
  randomLifeActive: boolean;
  minGridSize: number;
  maxGridSize: number;
  gridSize: number;
}

export const initialState: State = {
  maxTickInterval: 1000,
  autoTicking: false,
  tickInterval: 500,
  ticker: null,
  randomLifeActive: false,
  minGridSize: 10,
  maxGridSize: 25,
  gridSize: 10
};

const _gameConfigReducer = createReducer(
  initialState,

  on(GameConfigActions.startTicking, (state) => {
    return {
      ...state,
      autoTicking: true
    };
  }),

  on(GameConfigActions.stopTicking, (state) => {
    return {
      ...state,
      autoTicking: false
    };
  }),

  on(GameConfigActions.setTicker, (state, { newTicker }) => {
    return {
      ...state,
      ticker: newTicker
    };
  }),

  on(GameConfigActions.clearTicker, (state) => {
    return {
      ...state,
      ticker: null
    }
  }),

  on(GameConfigActions.setTickInterval, (state, { newTickInterval }) => {
    return {
      ...state,
      tickInterval: newTickInterval,
    };
  }),

  on(GameConfigActions.resetTickInterval, (state) => {
    return {
      ...state,
      tickInterval: initialState.tickInterval
    };
  }),

  on(GameConfigActions.emptyGenerationCheck, (state) => {
    return {
      ...state
    };
  }),

  on(GameConfigActions.activateRandomLife, (state) => {
    return {
      ...state,
      randomLifeActive: true
    };
  }),

  on(GameConfigActions.disableRandomLife, (state) => {
    return {
      ...state,
      randomLifeActive: false
    };
  })
);

export function gameConfigReducer(state: State, action: Action) {
  return _gameConfigReducer(state, action);
}
