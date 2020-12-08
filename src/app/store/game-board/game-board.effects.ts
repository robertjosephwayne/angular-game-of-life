import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../app.reducer';

import * as GameBoardActions from './game-board.actions';

@Injectable()
export class GameBoardEffects {

  nextGeneration$ = createEffect(() => this.actions$.pipe(
    ofType('[Ticker Effect] Tick'),
    map(() => {
      return GameBoardActions.nextGeneration();
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }

}
