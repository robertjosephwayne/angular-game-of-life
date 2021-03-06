import { Action, createReducer, on } from '@ngrx/store';

import { GameBoardState, initialState } from './game-board.state';

import * as GameBoardActions from './game-board.actions';

import { LifeGeneration } from 'src/app/models/life-generation.model';

const _gameBoardReducer = createReducer(
  initialState,

  on(GameBoardActions.toggleCellLife, (state, { rowIndex, columnIndex }) => {
    const updatedGeneration = toggleCellLife(state.currentGeneration, rowIndex, columnIndex);
    return {
      ...state,
      currentGeneration: updatedGeneration
    };
  }),

  on(GameBoardActions.zoomIn, (state) => {
    const gridSize = state.currentGeneration.length;
    const newGridSize = Math.max(state.minGridSize, gridSize - 1);
    const currentGenerationResized = resizeCurrentGeneration(state.currentGeneration, newGridSize);
    return {
      ...state,
      currentGeneration: currentGenerationResized
    };
  }),

  on(GameBoardActions.zoomOut, (state) => {
    const gridSize = state.currentGeneration.length;
    const newGridSize = Math.min(state.maxGridSize, gridSize + 1);
    const currentGenerationResized = resizeCurrentGeneration(state.currentGeneration, newGridSize);
    return {
      ...state,
      currentGeneration: currentGenerationResized
    };
  }),

  on(GameBoardActions.activateRandomLife, (state) => {
    return {
      ...state,
      randomLifeActive: true
    };
  }),

  on(GameBoardActions.disableRandomLife, (state) => {
    return {
      ...state,
      randomLifeActive: false
    };
  }),

  on(GameBoardActions.setCurrentGeneration, (state, { newGeneration }) => {
    return {
      ...state,
      currentGeneration: newGeneration,
      generationCount: 0
    }
  }),

  on(GameBoardActions.nextGeneration, (state) => {
    let nextGeneration = getNextGeneration(state.currentGeneration, state.randomLifeActive);
    return {
      ...state,
      currentGeneration: nextGeneration,
      generationCount: state.generationCount + 1
    };
  })

);

export function gameBoardReducer(state: GameBoardState, action: Action) {
  return _gameBoardReducer(state, action);
}

function getNextGeneration(currentGeneration: LifeGeneration, randomLifeActive: boolean): LifeGeneration {
  const gridSize = currentGeneration.length;

  let nextGeneration = [];

  for (let i = 0; i < gridSize; i++) {
    nextGeneration[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const isAlive = isAliveNextGeneration(currentGeneration, i, j);
      nextGeneration[i][j] = isAlive;
    }
  }

  if (randomLifeActive) {
    nextGeneration = addRandomLife(nextGeneration);
  }

  return nextGeneration;
}

function isAliveNextGeneration(currentGeneration: LifeGeneration, cellRow: number, cellColumn: number): number {
  const liveNeighbors = countLiveNeighbors(
    currentGeneration,
    cellRow,
    cellColumn);
  let isAlive = currentGeneration[cellRow][cellColumn];

  if (isAlive && liveNeighbors !== 2 && liveNeighbors !== 3) {
    isAlive = 0;
  } else if (liveNeighbors === 3) {
    isAlive = 1;
  }

  return isAlive;
}

function countLiveNeighbors(currentGeneration: LifeGeneration, cellRow: number, cellColumn: number): number {
  const lastRow = currentGeneration.length - 1;
  const lastColumn = currentGeneration[0].length - 1;
  let liveNeighbors = 0;

  for (let i = cellRow - 1; i <= cellRow + 1; i++) {
    let neighborRow = i;
    if (i === -1) {
      neighborRow = lastRow;
    } else if (i === lastRow + 1) {
      neighborRow = 0;
    }

    for (let j = cellColumn - 1; j <= cellColumn + 1; j++) {
      let neighborColumn = j;
      if (j === -1) {
        neighborColumn = lastColumn;
      } else if (j === lastColumn + 1) {
        neighborColumn = 0;
      }

      if (i === cellRow && j === cellColumn) continue;
      liveNeighbors += currentGeneration[neighborRow][neighborColumn];
    }
  }

  return liveNeighbors;
}

function toggleCellLife(generation: LifeGeneration, rowIndex: number, columnIndex: number): LifeGeneration {
  const lastRowIndex = generation.length - 1;
  const lastColumnIndex = generation[0].length - 1;

  if (rowIndex < 0 || rowIndex > lastRowIndex) return generation;
  if (columnIndex < 0 || columnIndex > lastColumnIndex) return generation;

  let updatedGeneration = [];
  generation.forEach(row => {
    updatedGeneration.push(row.slice());
  });

  if (updatedGeneration[rowIndex][columnIndex]) {
    updatedGeneration[rowIndex][columnIndex] = 0;
  } else {
    updatedGeneration[rowIndex][columnIndex] = 1;
  }

  return updatedGeneration;
}

function resizeCurrentGeneration(currentGeneration: LifeGeneration, newSize: number): LifeGeneration {
  const currentSize = currentGeneration.length;
  const currentGenerationResized = [];
  for (let i = 0; i < newSize; i++) {
    currentGenerationResized[i] = [];
    for (let j = 0; j < newSize; j++) {
      if (i >= currentSize || j >= currentSize) {
        currentGenerationResized[i][j] = 0;
      } else {
        currentGenerationResized[i][j] = currentGeneration[i][j];
      }
    }
  }
  return currentGenerationResized;
}

function addRandomLife(generation: LifeGeneration): LifeGeneration {
  let updatedGeneration = [];
  generation.forEach(row => {
    updatedGeneration.push(row.slice());
  });
  const gridSize = generation.length;
  const randomRow = Math.floor(Math.random() * gridSize);
  const randomColumn = Math.floor(Math.random() * gridSize);
  const currentCellValue = generation[randomRow][randomColumn];
  if (currentCellValue) {
    return addRandomLife(generation);
  } else {
    updatedGeneration[randomRow][randomColumn] = 1;
    return updatedGeneration;
  }
}
