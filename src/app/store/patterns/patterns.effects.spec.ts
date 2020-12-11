import { Action } from '@ngrx/store';
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable, of } from 'rxjs';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as PatternsActions from '../patterns/patterns.actions';
import * as TickerActions from '../ticker/ticker.actions';

import { PatternsEffects } from './patterns.effects';

import { PatternsService } from '../../services/patterns.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, mockState } from '../app.state';
import { initialState } from '../game-board/game-board.state';

describe('Patterns Effects', () => {
  let actions$: Observable<Action>;
  let effects: PatternsEffects;
  let store: MockStore<AppState>;

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

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(PatternsEffects);
  });

  describe('resetSelectedPattern$', () => {
    it('should dispatch the resetSelectedPattern action', (done) => {
      actions$ = of(GameBoardActions.reset());
      effects.resetSelectedPattern$.subscribe((actions) => {
        expect(actions).toEqual(
          PatternsActions.resetSelectedPattern()
        );
      });
      done();
    });
  });

  describe('updateCurrentGeneration$', () => {
    it('should dispatch the setCurrentGeneration action when a setSelectedPattern action is dispatched', () => {

    });

    it('should dispatch the setCurrentGeneration action when a resetSelectedPattern action is dispatched', () => {

    });
  });
});
