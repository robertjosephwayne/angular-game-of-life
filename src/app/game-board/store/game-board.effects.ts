import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as GameBoardActions from '../store/game-board.actions';
import * as GameStatsActions from '../../game-config/game-stats/store/game-stats.actions';

import * as fromApp from '../../store/app.reducer';

@Injectable()
export class GameBoardEffects {

  addRandomLiveCells$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Board] Tick'),
    withLatestFrom(this.store.select('gameConfig')),
    map(([action, gameConfigState]) => {
      if (gameConfigState.randomLifeActive) {
        return GameBoardActions.addRandomLiveCell();
      }
      return { type: 'Empty Action' };
    })
  ));

  incrementGenerationCount$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Board] Tick'),
    map(() => {
      return GameStatsActions.incrementGenerationCount();
    })
  ));

  updateLiveCellCount$ = createEffect(() => this.actions$.pipe(
    ofType(
      '[Game Board] Reset Generation',
      '[Game Board] Tick',
      '[Game Board] Add Random Live Cell',
      '[Game Board] Toggle Cell Life',
      '[Game Board] Set Current Generation',
      '[Game Board] Resize Current Generation'
    ),
    map(() => {
      return GameStatsActions.updateLiveCellCount();
    })
  ))

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }

}
