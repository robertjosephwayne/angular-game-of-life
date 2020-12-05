import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as GameStatsActions from '../store/game-stats.actions';
import * as fromApp from '../../../../store/app.reducer';

@Injectable()
export class GameStatsEffects {

  updateLiveCellCount$ = createEffect(() => this.actions$.pipe(
    ofType(
      '[Game Stats] Update Live Cell Count'),
    withLatestFrom(this.store.select('gameBoard')),
    map(([action, gameBoardState]) => {
      const liveCells = countLiveCells(gameBoardState.currentGeneration);
      return GameStatsActions.setLiveCellCount({ liveCells });
    })
  ))

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }
}

function countLiveCells(generation: number[][]) {
  const rows = generation.length;
  const columns = generation[0].length;
  let liveCells = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      liveCells += generation[i][j];
    }
  }

  return liveCells;
}
