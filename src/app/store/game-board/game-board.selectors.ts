import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const selectGameBoard = (state: AppState) => state.gameBoard;

export const selectCurrentGeneration = createSelector(
  selectGameBoard,
  gameBoard => gameBoard.currentGeneration
);

export const selectLiveCellCount = createSelector(
  selectCurrentGeneration,
  currentGeneration => countLiveCells(currentGeneration)
);

export const selectGenerationCount = createSelector(
  selectGameBoard,
  gameBoard => gameBoard.generationCount
);

export const selectGridSize = createSelector(
  selectCurrentGeneration,
  currentGeneration => currentGeneration.length
);

export const selectMinGridSize = createSelector(
  selectGameBoard,
  gameBoard => gameBoard.minGridSize
);

export const selectMaxGridSize = createSelector(
  selectGameBoard,
  gameBoard => gameBoard.maxGridSize
);

export const isRandomLifeActive = createSelector(
  selectGameBoard,
  gameBoard => gameBoard.randomLifeActive
);

export const canZoomIn = createSelector(
  selectGridSize,
  selectMinGridSize,
  (gridSize, minGridSize) => gridSize > minGridSize
);

export const canZoomOut = createSelector(
  selectGridSize,
  selectMaxGridSize,
  (gridSize, maxGridSize) => gridSize < maxGridSize
);

export const canReset = createSelector(
  selectGenerationCount,
  generationCount => generationCount > 0
);

export const canGenerateNextGeneration = createSelector(
  isRandomLifeActive,
  selectLiveCellCount,
  (randomLifeActive, liveCellCount) => !!(randomLifeActive || liveCellCount)
);

function countLiveCells(generation): number {
  let count = 0;
  for (let row of generation) {
    for (let cell of row) {
      count += cell;
    }
  }
  return count;
}
