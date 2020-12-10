import { INIT } from '@ngrx/store';
import { LifeGeneration } from 'src/app/models/life-generation.model';

import * as GameBoardActions from './game-board.actions';
import { gameBoardReducer } from './game-board.reducer';
import { initialState } from './game-board.state';

describe('Game Board Reducer', () => {

  describe('Game Board Actions', () => {

    describe('init action', () => {
      it('should return the initial state', () => {
        const nextState = gameBoardReducer(undefined, { type: INIT });
        expect(nextState).toBe(initialState);
      });
    });

    describe('unknown action', () => {
      it('should return the previous state', () => {
        const nextState = gameBoardReducer(initialState, {} as any);
        expect(nextState).toBe(initialState);
      });
    });

    describe('toggleCellLife action', () => {

    });

    describe('zoomIn action', () => {

    });

    describe('zoomOut action', () => {

    });

    describe('activateRandomLife action', () => {

    });

    describe('disableRandomLife action', () => {

    });

    describe('setCurrentGeneration action', () => {

    });

    describe('nextGeneration action', () => {

    });

    describe('reset action', () => {
      it('should return the previous state', () => {
        const nextState = gameBoardReducer(initialState, GameBoardActions.reset());
        expect(nextState).toBe(initialState);
      });
    });

  });
});
