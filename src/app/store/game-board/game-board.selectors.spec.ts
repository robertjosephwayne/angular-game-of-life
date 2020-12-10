import { mockState } from '../app.state';

import * as fromGameBoard from './game-board.selectors';
import { initialState, GameBoardState } from './game-board.state';

import { LifeGeneration } from 'src/app/models/life-generation.model';

describe('Game Board Selectors', () => {
  describe('selectGameBoard', () => {
    it('should return the game board state', () => {
      const appState = mockState();
      expect(fromGameBoard.selectGameBoard(appState)).toEqual(initialState);
    });
  });

  describe('selectCurrentGeneration', () => {
    it('should return the current generation', () => {
      const currentGeneration: LifeGeneration = fromGameBoard
        .selectCurrentGeneration
        .projector(initialState);

      expect(currentGeneration).toBe(initialState.currentGeneration);
    });
  });

  describe('selectLiveCellCount', () => {
    it('should return the number of live cells in the current generation', () => {
      const currentGeneration: LifeGeneration = [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
      ];

      const liveCellCount = fromGameBoard
        .selectLiveCellCount
        .projector(currentGeneration);

      expect(liveCellCount).toEqual(6);
    });
  });

  describe('selectGenerationCount', () => {
    it('should return the generation count', () => {
      const state: GameBoardState = {
        ...initialState,
        generationCount: 5
      };

      const generationCount = fromGameBoard
        .selectGenerationCount
        .projector(state);

      expect(generationCount).toEqual(5);
    });
  });

  describe('selectGridSize', () => {
    it('should return the number of rows in the current generation', () => {
      const currentGeneration = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];

      const gridSize = fromGameBoard
        .selectGridSize
        .projector(currentGeneration);

      expect(gridSize).toEqual(3);
    });
  });

  describe('selectMinGridSize', () => {
    it('should return the minimum grid size', () => {
      const state: GameBoardState = {
        ...initialState,
        minGridSize: 10
      };

      const minGridSize = fromGameBoard
        .selectMinGridSize
        .projector(state);

      expect(minGridSize).toEqual(10);
    });
  });

  describe('selectMaxGridSize', () => {
    it('should return the maximum grid size', () => {
      const state: GameBoardState = {
        ...initialState,
        maxGridSize: 25
      };

      const maxGridSize = fromGameBoard
        .selectMaxGridSize
        .projector(state);

      expect(maxGridSize).toEqual(25);
    });
  });

  describe('isRandomLifeActive', () => {
    it('should return true if random life is active', () => {
      const state: GameBoardState = {
        ...initialState,
        randomLifeActive: true
      };

      const isActive = fromGameBoard
        .isRandomLifeActive
        .projector(state);

      expect(isActive).toBeTrue();
    });

    it('should return false if random life is not active', () => {
      const state: GameBoardState = {
        ...initialState,
        randomLifeActive: false
      };

      const isActive = fromGameBoard
        .isRandomLifeActive
        .projector(state);

      expect(isActive).toBeFalse();
    });
  });

  describe('canZoomIn', () => {
    it('should return true if the current grid size is greater than the minimum grid size', () => {
      const gridSize = 15;
      const minGridSize = 10;

      const canZoomIn = fromGameBoard
        .canZoomIn
        .projector(gridSize, minGridSize);

      expect(canZoomIn).toBeTrue();
    });

    it('should return false if the current grid size is less than the minimum grid size', () => {
      const gridSize = 10;
      const minGridSize = 15;

      const canZoomIn = fromGameBoard
        .canZoomIn
        .projector(gridSize, minGridSize);

      expect(canZoomIn).toBeFalse();
    });

    it('should return false if the current grid size is equal to the minimum grid size', () => {
      const gridSize = 10;
      const minGridSize = 10;

      const canZoomIn = fromGameBoard
        .canZoomIn
        .projector(gridSize, minGridSize);

      expect(canZoomIn).toBeFalse();
    });
  });

  describe('canZoomOut', () => {
    it('should return true if the current grid size is less than the maximum grid size', () => {
      const gridSize = 10;
      const maxGridSize = 15;

      const canZoomOut = fromGameBoard
        .canZoomOut
        .projector(gridSize, maxGridSize);

      expect(canZoomOut).toBeTrue();
    });

    it('should return false if the current grid size is greater than the maximum grid size', () => {
      const gridSize = 15;
      const maxGridSize = 10;

      const canZoomOut = fromGameBoard
        .canZoomOut
        .projector(gridSize, maxGridSize);

      expect(canZoomOut).toBeFalse();
    });

    it('should return false if the current grid size is equal to the maximum grid size', () => {
      const gridSize = 10;
      const maxGridSize = 10;

      const canZoomOut = fromGameBoard
        .canZoomOut
        .projector(gridSize, maxGridSize);

      expect(canZoomOut).toBeFalse();
    });
  });

  describe('canReset', () => {
    it('should return true if the generation count is greater than 0', () => {
      const generationCount = 1;

      const canReset = fromGameBoard
        .canReset
        .projector(generationCount);

      expect(canReset).toBeTrue();
    });

    it('should return false if the generation count is zero', () => {
      const generationCount = 0;

      const canReset = fromGameBoard
        .canReset
        .projector(generationCount);

      expect(canReset).toBeFalse();
    });
  });

  describe('canGenerateNextGeneration', () => {
    it('should return true if random life is active', () => {
      const randomLifeActive = true;
      const liveCellCount = 0;

      const canGenerateNextGeneration = fromGameBoard
        .canGenerateNextGeneration
        .projector(randomLifeActive, liveCellCount);

      expect(canGenerateNextGeneration).toBeTrue();
    });

    it('should return true if there are any live cells in the current generation', () => {
      const randomLifeActive = false;
      const liveCellCount = 1;

      const canGenerateNextGeneration = fromGameBoard
        .canGenerateNextGeneration
        .projector(randomLifeActive, liveCellCount);

      expect(canGenerateNextGeneration).toBeTrue();
    });

    it('should return false if there are no live cells in the current generation and random life is inactive', () => {
      const randomLifeActive = false;
      const liveCellCount = 0;

      const canGenerateNextGeneration = fromGameBoard
        .canGenerateNextGeneration
        .projector(randomLifeActive, liveCellCount);

      expect(canGenerateNextGeneration).toBeFalse();
    });
  });
})
