import { Action, createReducer, on } from '@ngrx/store';

import * as GameStatsActions from './game-stats.actions';

export interface State {
  generationCount: number;
  liveCells: number;
}

export const initialState: State = {
  generationCount: 0,
  liveCells: 0
};

const _gameStatsReducer = createReducer(
  initialState,

  on(GameStatsActions.incrementGenerationCount, (state) => {
    return {
      ...state,
      generationCount: state.generationCount + 1
    };
  }),

  on(GameStatsActions.resetGenerationCount, (state) => {
    return {
      ...state,
      generationCount: 0
    };
  }),

  on(GameStatsActions.updateLiveCellCount, (state) => {
    return {
      ...state
    };
  }),

  on(GameStatsActions.setLiveCellCount, (state, { liveCells }) => {
    return {
      ...state,
      liveCells
    };
  })
);

export function gameStatsReducer(state: State, action: Action) {
  return _gameStatsReducer(state, action);
}
