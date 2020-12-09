import { GameBoardState } from './game-board/game-board.state';
import { TickerState } from './ticker/ticker.state';
import { PatternsState } from './patterns/patterns.state';

export interface AppState {
  gameBoard: GameBoardState;
  ticker: TickerState;
  patterns: PatternsState;
}
