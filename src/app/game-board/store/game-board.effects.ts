import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, tap, withLatestFrom } from 'rxjs/operators';

import * as GameBoardActions from '../store/game-board.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class GameBoardEffects {

  clearTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Board] Stop Ticking'),
    withLatestFrom(this.store.select('gameBoard')),
    map(([action, gameBoardState]) => {
      clearInterval(gameBoardState.ticker);
      return GameBoardActions.setTicker({ newTicker: null })
    })
  ));

  setTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Board] Start Ticking'),
    withLatestFrom(this.store.select('gameBoard')),
    map(([action, gameBoardState]) => {
      clearInterval(gameBoardState.ticker);
      const ticker = setInterval(() => {
        this.store.dispatch(GameBoardActions.tick());
        this.store.dispatch(GameBoardActions.emptyCheck());
      }, gameBoardState.tickInterval);
      return GameBoardActions.setTicker({ newTicker: ticker });
    })
  ));

  emptyCheck$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Board] Empty Check'),
    withLatestFrom(this.store.select('gameBoard')),
    map(([action, gameBoardState]) => {
      if (!(gameBoardState.liveCells || gameBoardState.randomLifeActive)) {
        return GameBoardActions.stopTicking();
      }
      return { type: 'Empty Action' };
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }
}
