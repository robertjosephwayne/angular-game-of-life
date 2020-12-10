import { INIT } from '@ngrx/store';

import * as PatternsActions from './patterns.actions';
import { patternsReducer } from './patterns.reducer';
import { initialState, PatternsState } from './patterns.state';

describe('Patterns Reducer', () => {

  describe('Patterns Actions', () => {

    describe('init action', () => {
      it('should return the initial state', () => {
        const nextState = patternsReducer(undefined, { type: INIT });
        expect(nextState).toBe(initialState);
      });
    });

    describe('unknown action', () => {
      it('should return the previous state', () => {
        const nextState = patternsReducer(initialState, {} as any);
        expect(nextState).toBe(initialState);
      });
    });

    describe('setSelectedPattern action', () => {

    });

    describe('resetSelectedPattern action', () => {

    });

  });

});
