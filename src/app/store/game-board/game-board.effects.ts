import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

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
  ) { }

}
