import { ActionReducerMap } from '@ngrx/store';

import * as fromGameBoard from './game-board/game-board.reducer';
import * as fromGameConfig from './game-config/game-config.reducer';
import * as fromPatterns from './patterns/patterns.reducer';

export interface AppState {
  gameBoard: fromGameBoard.State;
  gameConfig: fromGameConfig.State;
  patterns: fromPatterns.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  gameBoard: fromGameBoard.gameBoardReducer,
  gameConfig: fromGameConfig.gameConfigReducer,
  patterns: fromPatterns.patternsReducer
};
