import { ActionReducerMap } from '@ngrx/store';

import * as fromGameBoard from '../game-board/store/game-board.reducer';
import * as fromGameConfig from '../game-config/store/game-config.reducer';
import * as fromGameStats from '../game-config/game-stats/store/game-stats.reducer';
import * as fromPatterns from '../game-config/patterns/store/patterns.reducer';

export interface AppState {
  gameBoard: fromGameBoard.State;
  gameConfig: fromGameConfig.State;
  gameStats: fromGameStats.State;
  patterns: fromPatterns.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  gameBoard: fromGameBoard.gameBoardReducer,
  gameConfig: fromGameConfig.gameConfigReducer,
  gameStats: fromGameStats.gameStatsReducer,
  patterns: fromPatterns.patternsReducer
};
