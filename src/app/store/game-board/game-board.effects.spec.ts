import { Action } from '@ngrx/store';
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable, of } from 'rxjs';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as TickerActions from '../ticker/ticker.actions';

import { GameBoardEffects } from './game-board.effects';

describe('Game Board Effects', () => {
  let actions$: Observable<Action>;
  let effects: GameBoardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameBoardEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(GameBoardEffects);
  });

  describe('nextGeneration$', () => {
    it('should dispatch the nextGeneration action', () => {
      actions$ = of(TickerActions.tick());
      effects.nextGeneration$.subscribe((actions) => {
        expect(actions).toEqual(
          GameBoardActions.nextGeneration()
        );
      });
    });
  });
});
