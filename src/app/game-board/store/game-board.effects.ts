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

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }

}
