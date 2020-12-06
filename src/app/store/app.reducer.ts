import { ActionReducerMap } from '@ngrx/store';

import * as fromGameBoard from './game-board/game-board.reducer';
import * as fromTicker from './ticker/ticker.reducer';
import * as fromPatterns from './patterns/patterns.reducer';

export interface AppState {
  gameBoard: fromGameBoard.State;
  ticker: fromTicker.State;
  patterns: fromPatterns.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  gameBoard: fromGameBoard.gameBoardReducer,
  ticker: fromTicker.tickerReducer,
  patterns: fromPatterns.patternsReducer
};
