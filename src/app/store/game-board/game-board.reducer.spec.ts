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

      it('should decrease the row count by 1 if grid size is above minimum size', () => {
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
          minGridSize: 5,
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

        expect(nextRowCount).toEqual(initialRowCount - 1);
      });

      it('should decrease the column count by 1 if grid size is above minimum size', () => {
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
          minGridSize: 5,
          maxGridSize: 25
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.zoomIn()
        );

        const initialGeneration = state.currentGeneration;
        const initialColumnCount = initialGeneration[0].length;

        const nextGeneration = nextState.currentGeneration;
        const nextColumnCount = nextGeneration[0].length;

        expect(nextColumnCount).toEqual(initialColumnCount - 1);
      });

      it('should not change the cells which are within the new grid size', () => {

      });

    });

    describe('zoomOut action', () => {

      it('should not change the current row count if grid size is already at the maximum size', () => {
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
          minGridSize: 5,
          maxGridSize: 10
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.zoomOut()
        );

        const initialGeneration = state.currentGeneration;
        const initialRowCount = initialGeneration.length;

        const nextGeneration = nextState.currentGeneration;
        const nextRowCount = nextGeneration.length;

        expect(nextRowCount).toEqual(initialRowCount);
      });

      it('should not change the current column count if grid size is already at the maximum size', () => {
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
          minGridSize: 5,
          maxGridSize: 10
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.zoomOut()
        );

        const initialGeneration = state.currentGeneration;
        const initialColumnCount = initialGeneration[0].length;

        const nextGeneration = nextState.currentGeneration;
        const nextColumnCount = nextGeneration[0].length;

        expect(nextColumnCount).toEqual(initialColumnCount);
      });

      it('should increase the row count by 1 if grid size is below maximum size', () => {
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
          minGridSize: 5,
          maxGridSize: 25
        };
        const nextState = gameBoardReducer(
          state,
          GameBoardActions.zoomOut()
        );

        const initialGeneration = state.currentGeneration;
        const initialRowCount = initialGeneration.length;

        const nextGeneration = nextState.currentGeneration;
        const nextRowCount = nextGeneration.length;

        expect(nextRowCount).toEqual(initialRowCount + 1);
      });

      it('should increase the column count by 1 if grid size is below maximum size', () => {
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
          minGridSize: 5,
          maxGridSize: 25
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.zoomOut()
        );

        const initialGeneration = state.currentGeneration;
        const initialColumnCount = initialGeneration[0].length;

        const nextGeneration = nextState.currentGeneration;
        const nextColumnCount = nextGeneration[0].length;

        expect(nextColumnCount).toEqual(initialColumnCount + 1);
      });

      it('should not change the cells which are within the new grid size', () => {

      });

    });

    describe('activateRandomLife action', () => {

      it('should activate random life', () => {
        const state: GameBoardState = {
          ...initialState,
          randomLifeActive: false
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.activateRandomLife()
        );

        expect(nextState.randomLifeActive).toBeTrue();
      });

    });

    describe('disableRandomLife action', () => {

      it('should disable random life', () => {
        const state: GameBoardState = {
          ...initialState,
          randomLifeActive: true
        };

        const nextState = gameBoardReducer(
          state,
          GameBoardActions.disableRandomLife()
        );

        expect(nextState.randomLifeActive).toBeFalse();
      });

    });

    describe('setCurrentGeneration action', () => {

      it('should set the current generation to a new generation', () => {
        const newGeneration: LifeGeneration = [
          [1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1],
        ];

        const nextState = gameBoardReducer(
          initialState,
          GameBoardActions.setCurrentGeneration({ newGeneration })
        );

        expect(nextState.currentGeneration).toBe(newGeneration);
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
