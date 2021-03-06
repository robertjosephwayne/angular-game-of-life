import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as TickerActions from './ticker.actions';

import * as fromGameBoard from '../../store/game-board/game-board.selectors';
import * as fromTicker from '../../store/ticker/ticker.selectors';

import { TickerService } from 'src/app/services/ticker.service';

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
    ofType(TickerActions.startTicking),
    withLatestFrom(this.store.select(fromTicker.selectTickInterval)),
    withLatestFrom(this.store.select(fromTicker.selectActiveTicker)),
    map(([[action, tickInterval], activeTicker]) => {
      if (activeTicker) {
        this.tickerService.replaceActiveAutoTicker(activeTicker, tickInterval)
      } else {
        this.tickerService.createAutoTicker(tickInterval);
      }
    }),
  ), { dispatch: false });

  updateActiveTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.updateActiveTickInterval),
    withLatestFrom(this.store.select(fromTicker.selectActiveTicker)),
    withLatestFrom(this.store.select(fromTicker.selectTickInterval)),
    map(([[action, activeTicker], tickInterval]) => {
      this.tickerService.replaceActiveAutoTicker(activeTicker, tickInterval);
    }),
  ), { dispatch: false });

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

  setCurrentGeneration$ = createEffect(() => this.actions$.pipe(
    ofType(GameBoardActions.setCurrentGeneration),
    map(() => TickerActions.stopTicking())
  ));

  pause$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.pause),
    map(() => TickerActions.stopTicking())
  ));

  clearTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.stopTicking),
    withLatestFrom(this.store.select(fromTicker.selectActiveTicker)),
    map(([action, activeTicker]) => {
      this.tickerService.clearAutoTicker(activeTicker);
    }),
  ), { dispatch: false });

  manualTick$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.manualTick),
    map(() => TickerActions.tick())
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private tickerService: TickerService
  ) { }
}
