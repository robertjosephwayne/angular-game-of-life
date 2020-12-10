import { INIT } from '@ngrx/store';

import { appReducer } from './app.reducer';

import { GameBoardState } from './game-board/game-board.state';
import { TickerState } from './ticker/ticker.state';
import { PatternsState } from './patterns/patterns.state';

export interface AppState {
  gameBoard: GameBoardState;
  ticker: TickerState;
  patterns: PatternsState;
}

export const mockState = (override: Partial<AppState> = {}): AppState => {
  const initialState = {};

  Object.entries(appReducer).forEach(([key, reducer]) => {
    initialState[key] = reducer(undefined, { type: INIT });
  });

  return {
    ...initialState,
    ...override
  } as AppState;
};
