import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as TickerActions from './ticker.actions';

import * as fromApp from '../app.reducer';

@Injectable()
export class TickerEffects {

  resetTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Buttons Component] Reset'),
    map(() => {
      return TickerActions.resetTickInterval();
    })
  ));

  setTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config Component] Start Ticking'),
    withLatestFrom(this.store.select('ticker')),
    map(([action, tickerState]) => {
      clearInterval(tickerState.activeTicker);
      const ticker = setInterval(() => {
        this.store.dispatch(TickerActions.autoTick());
      }, tickerState.tickInterval);
      return TickerActions.setTicker({ newTicker: ticker });
    })
  ));

  autoTick$ = createEffect(() => this.actions$.pipe(
    ofType('[Ticker Effect] Auto Tick'),
    withLatestFrom(this.store.select('gameBoard')),
    map(([action, gameBoardState]) => {
      if (!(gameBoardState.liveCells || gameBoardState.randomLifeActive)) {
        return TickerActions.stopTicking();
      }
      else {
        return GameBoardActions.nextGeneration();
      }
    })
  ));

  stopTicking$ = createEffect(() => this.actions$.pipe(
    ofType('[Patterns Component] Set Current Generation'),
    map(() => {
      return TickerActions.stopTicking();
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

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }
}

