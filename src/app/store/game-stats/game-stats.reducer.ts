import { Action, createReducer, on } from '@ngrx/store';

import * as GameStatsActions from './game-stats.actions';

export interface State {
  liveCells: number;
}

export const initialState: State = {
  liveCells: 0
};

const _gameStatsReducer = createReducer(
  initialState,

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
