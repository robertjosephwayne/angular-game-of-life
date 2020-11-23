import { ActionReducerMap } from '@ngrx/store';

import * as fromGameBoard from '../game-board/store/game-board.reducer';

export interface AppState {
  gameBoard: fromGameBoard.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  gameBoard: fromGameBoard.gameBoardReducer
};
