import { Action } from '@ngrx/store';
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable, of } from 'rxjs';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as PatternsActions from '../patterns/patterns.actions';

import { PatternsEffects } from './patterns.effects';

import * as fromPatterns from '../patterns/patterns.selectors';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, mockState } from '../app.state';

import { LifeGeneration } from 'src/app/models/life-generation.model';

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
    it('should dispatch the setCurrentGeneration action when a setSelectedPattern action is dispatched', () => {
      const selectedPatternSelector = store.overrideSelector(fromPatterns.selectedPattern, '');
      store.setState(mockState({
        gameBoard: {
          currentGeneration: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ],
          generationCount: 0,
          minGridSize: 5,
          maxGridSize: 25,
          randomLifeActive: false
        }
      }));

      const patternName = 'Glider';
      selectedPatternSelector.setResult(patternName);
      const expectedGeneration: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ];

      actions$ = of(PatternsActions.setSelectedPattern({ patternName }));
      effects.updateCurrentGeneration$.subscribe((actions) => {
        expect(actions).toEqual(
          GameBoardActions.setCurrentGeneration({ newGeneration: expectedGeneration })
        );
      });
    });

    it('should dispatch the setCurrentGeneration action when a resetSelectedPattern action is dispatched', () => {
      store.setState(mockState({
        gameBoard: {
          currentGeneration: [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
          ],
          generationCount: 0,
          minGridSize: 5,
          maxGridSize: 25,
          randomLifeActive: false
        }
      }));

      const patternName = 'Empty';
      const expectedGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      actions$ = of(PatternsActions.resetSelectedPattern());
      effects.updateCurrentGeneration$.subscribe((actions) => {
        expect(actions).toEqual(
          GameBoardActions.setCurrentGeneration({ newGeneration: expectedGeneration })
        );
      });
    });
  });
});
