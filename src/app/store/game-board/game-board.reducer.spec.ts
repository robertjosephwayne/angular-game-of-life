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

      it('should toggle the selected cell to dead if it was alive', () => {
        const state: GameBoardState = {
          ...initialState,
          currentGeneration: [
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

        expect(updatedCellValue).toEqual(0);
      });

      it('should only change a single cell', () => {
        const rowIndex = 0;
        const columnIndex = 0;

        const nextState = gameBoardReducer(
          initialState,
          GameBoardActions.toggleCellLife({ rowIndex, columnIndex })
        );

        const initialGeneration = initialState.currentGeneration;
        const nextGeneration = nextState.currentGeneration;
        const differentCellCount = countDifferentCells(initialGeneration, nextGeneration);

        expect(differentCellCount).toEqual(1);
      });

      it('should not change the current generation if the row is invalid', () => {
        const rowIndex = -1;
        const columnIndex = 0;

        const nextState = gameBoardReducer(
          initialState,
          GameBoardActions.toggleCellLife({ rowIndex, columnIndex })
        );

        const initialGeneration = initialState.currentGeneration;
        const nextGeneration = nextState.currentGeneration;
        const differentCellCount = countDifferentCells(initialGeneration, nextGeneration);

        expect(differentCellCount).toEqual(0);
      });

      it('should not change the current generation if the column is invalid', () => {
        const rowIndex = 0;
        const columnIndex = -1;

        const nextState = gameBoardReducer(
          initialState,
          GameBoardActions.toggleCellLife({ rowIndex, columnIndex })
        );

        const initialGeneration = initialState.currentGeneration;
        const nextGeneration = nextState.currentGeneration;
        const differentCellCount = countDifferentCells(initialGeneration, nextGeneration);

        expect(differentCellCount).toEqual(0);
      });

    });

    describe('zoomIn action', () => {

      it('should not change the current generation row count if grid size is already at the minimum size', () => {
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
          ],
          minGridSize: 10,
          maxGridSize: 25
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.zoomIn()
        );

        const initialGeneration = state.currentGeneration;
        const initialRowCount = initialGeneration.length;

        const nextGeneration = nextState.currentGeneration;
        const nextRowCount = nextGeneration.length;

        expect(nextRowCount).toBe(initialRowCount);
      });

      it('should not change the current generation column count if grid size is already at the minimum size', () => {
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
          ],
          minGridSize: 10,
          maxGridSize: 25
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.zoomIn()
        );

        const initialGeneration = state.currentGeneration;
        const initialColumnCount = initialGeneration.length;

        const nextGeneration = nextState.currentGeneration;
        const nextColumnCount = nextGeneration[0].length;

        expect(nextColumnCount).toEqual(initialColumnCount);
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
