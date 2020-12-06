import { Action, createReducer, on } from '@ngrx/store';

import * as GameBoardActions from './game-board.actions';

export interface State {
  currentGeneration: number[][];
  generationCount: number;
}

export const initialState: State = {
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
  generationCount: 0
};

const _gameBoardReducer = createReducer(
  initialState,

  on(GameBoardActions.tick, (state) => {
    const nextGeneration = getNextGeneration(state.currentGeneration);
    return {
      ...state,
      currentGeneration: nextGeneration,
      generationCount: state.generationCount + 1
    };
  }),

  on(GameBoardActions.addRandomLiveCell, (state) => {
    let updatedGeneration = addRandomLife(state.currentGeneration);
    return {
      ...state,
      currentGeneration: updatedGeneration
    }
  }),

  on(GameBoardActions.toggleCellLife, (state, { rowIndex, columnIndex }) => {
    const updatedGeneration = toggleCellLife(state.currentGeneration, rowIndex, columnIndex);
    return {
      ...state,
      currentGeneration: updatedGeneration
    };
  }),

  on(GameBoardActions.resizeCurrentGeneration, (state, { newSize }) => {
    const currentGenerationResized = resizeCurrentGeneration(state.currentGeneration, newSize);
    return {
      ...state,
      currentGeneration: currentGenerationResized
    }
  }),

  on(GameBoardActions.setCurrentGeneration, (state, { newGeneration }) => {
    return {
      ...state,
      currentGeneration: newGeneration,
      generationCount: 0
    }
  })
);

export function gameBoardReducer(state: State, action: Action) {
  return _gameBoardReducer(state, action);
}

function getNextGeneration(currentGeneration: number[][]) {
  const gridSize = currentGeneration.length;
  let nextGeneration = [];

  for (let i = 0; i < gridSize; i++) {
    nextGeneration[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const isAlive = isAliveNextGeneration(currentGeneration, i, j);
      nextGeneration[i][j] = isAlive;
    }
  }

  return nextGeneration;
}

function isAliveNextGeneration(currentGeneration: number[][], cellRow: number, cellColumn: number) {
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

function countLiveNeighbors(currentGeneration: number[][], cellRow: number, cellColumn: number) {
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

function toggleCellLife(generation: number[][], rowIndex: number, columnIndex: number) {
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

function resizeCurrentGeneration(currentGeneration: number[][], newSize: number) {
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

function addRandomLife(generation: number[][]) {
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

