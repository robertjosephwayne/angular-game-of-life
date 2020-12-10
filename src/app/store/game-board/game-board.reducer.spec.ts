import { INIT } from '@ngrx/store';
import { LifeGeneration } from 'src/app/models/life-generation.model';

import * as GameBoardActions from './game-board.actions';
import { gameBoardReducer } from './game-board.reducer';
import { GameBoardState, initialState } from './game-board.state';

describe('Game Board Reducer', () => {

  describe('Game Board Actions', () => {

    describe('init action', () => {

      it('should return the initial state', () => {
        const nextState = gameBoardReducer(
          undefined,
          { type: INIT }
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('unknown action', () => {

      it('should return the previous state', () => {
        const nextState = gameBoardReducer(
          initialState,
          {} as any
        );

        expect(nextState).toBe(initialState);
      });

    });

    describe('toggleCellLife action', () => {

      it('should toggle the selected cell to alive if it was dead', () => {
        const state: GameBoardState = {
          ...initialState,
          currentGeneration: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ]
        };

        const rowIndex = 0;
        const columnIndex = 0;

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.toggleCellLife({ rowIndex, columnIndex })
        );

        const updatedGeneration = nextState.currentGeneration;
        const updatedCellValue = updatedGeneration[0][0];

        expect(updatedCellValue).toEqual(1);
      });
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
