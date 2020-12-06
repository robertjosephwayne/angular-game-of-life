import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as TickerActions from './ticker.actions';

import * as fromApp from '../app.reducer';

@Injectable()
export class TickerEffects {

  setTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config] Start Ticking'),
    withLatestFrom(this.store.select('ticker')),
    map(([action, tickerState]) => {
      clearInterval(tickerState.activeTicker);
      const ticker = setInterval(() => {
        this.store.dispatch(GameBoardActions.tick());
        this.store.dispatch(TickerActions.emptyGenerationCheck());
      }, tickerState.tickInterval);
      return TickerActions.setTicker({ newTicker: ticker });
    })
  ));

  clearTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config] Stop Ticking'),
    withLatestFrom(this.store.select('ticker')),
    map(([action, tickerState]) => {
      clearInterval(tickerState.activeTicker);
      return TickerActions.clearTicker();
    })
  ));

  emptyGenerationCheck$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config] Empty Generation Check'),
    withLatestFrom(this.store.select('ticker')),
    withLatestFrom(this.store.select('gameBoard')),
    map(([[action, tickerState], gameBoardState]) => {
      if (!(gameBoardState.liveCells || tickerState.randomLifeActive)) {
        return TickerActions.stopTicking();
      }
      return { type: 'Empty Action' };
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }
}

