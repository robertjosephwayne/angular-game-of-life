import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as fromPatterns from '../patterns/patterns.selectors';
import * as fromGameBoard from '../game-board/game-board.selectors';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as PatternsActions from '../patterns/patterns.actions';

import { PatternsService } from '../../services/patterns.service';

@Injectable()
export class PatternsEffects {

  resetSelectedPattern$ = createEffect(() => this.actions$.pipe(
    ofType(GameBoardActions.reset),
    map(() => PatternsActions.resetSelectedPattern())
  ));

  updateCurrentGeneration$ = createEffect(() => this.actions$.pipe(
    ofType(
      PatternsActions.setSelectedPattern,
      PatternsActions.resetSelectedPattern
    ),
    withLatestFrom(this.store.select(fromPatterns.selectedPattern)),
    withLatestFrom(this.store.select(fromGameBoard.selectGridSize)),
    map(([[action, selectedPattern], gridSize]) => {
      const newGeneration = this.patternsService.createPattern(selectedPattern, gridSize);
      return GameBoardActions.setCurrentGeneration({ newGeneration });
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private patternsService: PatternsService
  ) { }
}
