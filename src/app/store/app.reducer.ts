import { ActionReducerMap } from '@ngrx/store';

import * as fromGameBoard from '../components/game-board/store/game-board.reducer';
import * as fromGameConfig from '../components/game-config/store/game-config.reducer';
import * as fromGameStats from '../components/game-config/game-stats/store/game-stats.reducer';
import * as fromPatterns from '../components/game-config/patterns/store/patterns.reducer';

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
