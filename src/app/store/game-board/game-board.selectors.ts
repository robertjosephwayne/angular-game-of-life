import { createSelector } from '@ngrx/store';

import * as fromApp from '../app.reducer';

export const selectGameBoard = (state: fromApp.AppState) => state.gameBoard;

export const selectLiveCellCount = createSelector(
  selectGameBoard,
  gameBoard => countLiveCells(gameBoard.currentGeneration)
);

export const selectGenerationCount = createSelector(
  selectGameBoard,
  gameBoard => gameBoard.generationCount
);

export const canReset = createSelector(
  selectGenerationCount,
  generationCount => generationCount > 0
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
