import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as TickerActions from './ticker.actions';

import * as fromGameBoard from '../../store/game-board/game-board.selectors';
import * as fromTicker from '../../store/ticker/ticker.selectors';

@Injectable()
export class TickerEffects {

  resetTickSpeed$ = createEffect(() => this.actions$.pipe(
    ofType(GameBoardActions.reset),
    map(() => TickerActions.resetTickSpeed())
  ));

  setTickSpeed$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.setTickSpeed),
    withLatestFrom(this.store.select(fromTicker.isTicking)),
    map(([action, isTicking]) => {
      if (isTicking) {
        return TickerActions.updateActiveTickInterval();
      } else {
        return { type: 'Empty Action' };
      }
    })
  ));

  startTicking$ = createEffect(() => this.actions$.pipe(
    ofType(
      TickerActions.startTicking,
      TickerActions.updateActiveTickInterval
    ),
    withLatestFrom(this.store.select(fromTicker.selectActiveTicker)),
    withLatestFrom(this.store.select(fromTicker.selectTickInterval)),
    map(([[action, activeTicker], tickInterval]) => {
      clearInterval(activeTicker);
      const newTicker = setInterval(() => {
        this.store.dispatch(TickerActions.autoTick());
      }, tickInterval);
      return TickerActions.setTicker({ newTicker });
    })
  ));

  autoTick$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.autoTick),
    withLatestFrom(this.store.select(fromGameBoard.selectLiveCellCount)),
    withLatestFrom(this.store.select(fromGameBoard.isRandomLifeActive)),
    map(([[action, liveCellCount], isRandomLifeActive]) => {
      if (!(liveCellCount || isRandomLifeActive)) {
        return TickerActions.stopTicking();
      } else {
        return TickerActions.tick();
      }
    })
  ));

  stopTicking$ = createEffect(() => this.actions$.pipe(
    ofType(
      GameBoardActions.setCurrentGeneration,
      TickerActions.pause
    ),
    map(() => TickerActions.stopTicking())
  ));

  clearTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.stopTicking),
    withLatestFrom(this.store.select(fromTicker.selectActiveTicker)),
    map(([action, activeTicker]) => {
      clearInterval(activeTicker);
      return TickerActions.clearTicker();
    })
  ));

  manualTick$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.manualTick),
    map(() => TickerActions.tick())
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }
}
