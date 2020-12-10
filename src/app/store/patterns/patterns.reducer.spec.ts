import { INIT } from '@ngrx/store';

import * as PatternsActions from './patterns.actions';
import { patternsReducer } from './patterns.reducer';
import { initialState, PatternsState } from './patterns.state';

describe('Patterns Reducer', () => {

  describe('Patterns Actions', () => {

    describe('init action', () => {

      it('should return the initial state', () => {
        const nextState = patternsReducer(
          undefined,
          { type: INIT }
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('unknown action', () => {

      it('should return the previous state', () => {
        const nextState = patternsReducer(
          initialState,
          {} as any
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('setSelectedPattern action', () => {

      it('should set the selected pattern to the specified pattern name if it is valid', () => {
        const state: PatternsState = {
          ...initialState,
          presetPatterns: [
            'Empty',
            'Glider',
            'Tub'
          ],
          selectedPattern: 'Tub'
        };

        const nextState = patternsReducer(
          state,
          PatternsActions.setSelectedPattern({ patternName: 'Glider' })
        );

        expect(nextState.selectedPattern).toBe('Glider');
      });

          ],
          selectedPattern: 'Tub'
        };

        const nextState = patternsReducer(
          state,
          PatternsActions.setSelectedPattern({ patternName: 'glider' })
        );

        expect(nextState.selectedPattern).toBe('Tub');
      });

    });

    describe('resetSelectedPattern action', () => {

    });

  });

});
