import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as GameConfigActions from './game-config.actions';

import * as fromApp from '../app.reducer';

@Injectable()
export class GameConfigEffects {

  setTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config] Start Ticking'),
    withLatestFrom(this.store.select('gameConfig')),
    map(([action, gameConfigState]) => {
      clearInterval(gameConfigState.ticker);
      const ticker = setInterval(() => {
        this.store.dispatch(GameBoardActions.tick());
        this.store.dispatch(GameConfigActions.emptyGenerationCheck());
      }, gameConfigState.tickInterval);
      return GameConfigActions.setTicker({ newTicker: ticker });
    })
  ));

  clearTickInterval$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config] Stop Ticking'),
    withLatestFrom(this.store.select('gameConfig')),
    map(([action, gameConfigState]) => {
      clearInterval(gameConfigState.ticker);
      return GameConfigActions.clearTicker();
    })
  ));

  emptyGenerationCheck$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Config] Empty Generation Check'),
    withLatestFrom(this.store.select('gameConfig')),
    withLatestFrom(this.store.select('gameBoard')),
    map(([[action, gameConfigState], gameBoardState]) => {
      if (!(gameBoardState.liveCells || gameConfigState.randomLifeActive)) {
        return GameConfigActions.stopTicking();
      }
      return { type: 'Empty Action' };
    })
  ));

  resizeCurrentGeneration$ = createEffect(() => this.actions$.pipe(
    ofType(
      '[Game Config] Zoom In',
      '[Game Config] Zoom Out',
      '[Game Config] Reset Grid Size'
    ),
    withLatestFrom(this.store.select('gameConfig')),
    map(([action, gameConfigState]) => {
      return GameBoardActions.resizeCurrentGeneration({
        newSize: gameConfigState.gridSize
      });
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }
}

