import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as TickerActions from './ticker.actions';

import * as fromApp from '../app.reducer';
import * as fromTicker from '../../store/ticker/ticker.selectors';

@Injectable()
export class TickerEffects {

  resetTickSpeed$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Buttons Component] Reset'),
    map(() => {
      return TickerActions.resetTickSpeed();
    })
  ));

  setTickSpeed$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config Component] Set Tick Speed'),
    withLatestFrom(this.store.select('ticker')),
    map(([action, tickerState]) => {
      if (tickerState.activeTicker) {
        return TickerActions.updateActiveTickInterval();
      } else {
        return { type: 'Empty Action' };
      }
    })
  ));

  startTicking$ = createEffect(() => this.actions$.pipe(
    ofType(
      '[Game Buttons Component] Start Ticking',
      '[Ticker Effect] Update Active Tick Interval'
    ),
    withLatestFrom(this.store.select('ticker')),
    withLatestFrom(this.store.select(fromTicker.selectTickInterval)),
    map(([[action, tickerState], tickInterval]) => {
      clearInterval(tickerState.activeTicker);
      const ticker = setInterval(() => {
        this.store.dispatch(TickerActions.autoTick());
      }, tickInterval);
      return TickerActions.setTicker({ newTicker: ticker });
    })
  ));

  autoTick$ = createEffect(() => this.actions$.pipe(
    ofType('[Ticker Effect] Auto Tick'),
    withLatestFrom(this.store.select('gameBoard')),
    map(([action, gameBoardState]) => {
      if (!(hasLife(gameBoardState.currentGeneration) || gameBoardState.randomLifeActive)) {
        return TickerActions.stopTicking();
      } else {
        return TickerActions.tick();
      }
    })
  ));

  stopTicking$ = createEffect(() => this.actions$.pipe(
    ofType(
      '[Patterns Component] Set Current Generation',
      '[Game Buttons Component] Pause'
    ),
    map(() => {
      return TickerActions.stopTicking();
    })
  ));

  clearTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Ticker Effect] Stop Ticking'),
    withLatestFrom(this.store.select('ticker')),
    map(([action, tickerState]) => {
      clearInterval(tickerState.activeTicker);
      return TickerActions.clearTicker();
    })
  ));

  manualTick$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Buttons Component] Manual Tick'),
    map(() => {
      return TickerActions.tick();
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }
}

function hasLife(generation): boolean {
  for (let row of generation) {
    for (let cell of row) {
      if (cell) return true;
    }
  }
  return false;
}
