import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import * as GameBoardActions from './game-board.actions';

import * as fromApp from '../app.reducer';

@Injectable()
export class GameBoardEffects {

  addRandomLiveCells$ = createEffect(() => this.actions$.pipe(
    ofType('[Game Board] Tick'),
    withLatestFrom(this.store.select('ticker')),
    map(([action, tickerState]) => {
      if (tickerState.randomLifeActive) {
        return GameBoardActions.addRandomLiveCell();
      }
      return { type: 'Empty Action' };
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }

}
