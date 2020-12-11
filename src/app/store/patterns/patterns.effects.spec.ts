import { Action } from '@ngrx/store';
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable, of } from 'rxjs';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as PatternsActions from '../patterns/patterns.actions';
import * as TickerActions from '../ticker/ticker.actions';

import { PatternsEffects } from './patterns.effects';

import { PatternsService } from '../../services/patterns.service';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState, mockState } from '../app.state';

describe('Patterns Effects', () => {
  let actions$: Observable<Action>;
  let effects: PatternsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PatternsEffects,
        provideMockActions(() => actions$),
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    });
    effects = TestBed.inject(PatternsEffects);
  });

  describe('resetSelectedPattern$', () => {
    it('should dispatch the resetSelectedPattern action', () => {
      actions$ = of(GameBoardActions.reset());
      effects.resetSelectedPattern$.subscribe((actions) => {
        expect(actions).toEqual(
          PatternsActions.resetSelectedPattern()
        );
      });
    });
  });

  describe('updateCurrentGeneration$', () => {
    it('should dispatch the setCurrentGeneration action', () => {

    });
  });
});
