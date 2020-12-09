import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';

import { gameBoardReducer } from './game-board/game-board.reducer';
import { tickerReducer } from './ticker/ticker.reducer';
import { patternsReducer } from './patterns/patterns.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  gameBoard: gameBoardReducer,
  ticker: tickerReducer,
  patterns: patternsReducer
};
