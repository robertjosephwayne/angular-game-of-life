import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as GameBoardActions from './game-board.actions';
import * as TickerActions from '../ticker/ticker.actions';

@Injectable()
export class GameBoardEffects {

  nextGeneration$ = createEffect(() => this.actions$.pipe(
    ofType(TickerActions.tick),
    map(() => GameBoardActions.nextGeneration())
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }

}
