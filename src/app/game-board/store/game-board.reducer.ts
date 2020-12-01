import { Action, createReducer, on } from '@ngrx/store';

import * as GameBoardActions from './game-board.actions';

export interface State {
  currentGeneration: number[][];
  generationCount: number;

  presetPatterns: string[];
  selectedPattern: string;

  minGridSize: number;
  maxGridSize: number;
  gridSize: number;

  autoTicking: boolean;
  tickInterval: number;
  maxTickInterval: number;
  ticker: any;

  randomLifeActive: boolean;
  liveCells: number;
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
  generationCount: 0,
  presetPatterns: [
    'Empty',
    'Glider',
    'Small Exploder',
    'Exploder',
    'Ten Cell Row',
    'Lightweight Spaceship',
    'Block',
    'Tub',
    'Boat'
  ],
  selectedPattern: 'Empty',
  minGridSize: 10,
  maxGridSize: 25,
  gridSize: 10,
  autoTicking: false,
  tickInterval: 500,
  maxTickInterval: 1000,
  ticker: null,
  randomLifeActive: false,
  liveCells: 0
};

const _gameBoardReducer = createReducer(
  initialState,

  on(GameBoardActions.resetGeneration, (state) => {
    const initialGeneration = getSelectedPattern(state.selectedPattern, state.gridSize);
    const liveCells = countLiveCells(initialGeneration);
    return {
      ...state,
      currentGeneration: initialGeneration,
      generationCount: 0,
      liveCells
    };
  }),

  on(GameBoardActions.setSelectedPattern, (state, { patternName }) => {
    const newGeneration = getSelectedPattern(patternName, state.gridSize);
    const liveCells = countLiveCells(newGeneration);
    return {
      ...state,
      selectedPattern: patternName,
      currentGeneration: newGeneration,
      liveCells,
      generationCount: 0
    };
  }),

  on(GameBoardActions.setGridSize, (state, { gridSize }) => {
    let newGridSize = gridSize;
    if (newGridSize >= state.maxGridSize) {
      newGridSize = state.maxGridSize;
    } else if (newGridSize <= state.minGridSize) {
      newGridSize = state.minGridSize;
    }
    const currentGenerationResized = resizeCurrentGeneration(state.currentGeneration, newGridSize);
    const liveCells = countLiveCells(currentGenerationResized);
    return {
      ...state,
      gridSize: newGridSize,
      currentGeneration: currentGenerationResized,
      liveCells
    };
  }),

  on(GameBoardActions.resetGridSize, (state) => {
    return {
      ...state,
      gridSize: initialState.gridSize,
    };
  }),

  on(GameBoardActions.tick, (state) => {
    let updatedGeneration = getNextGeneration(state.currentGeneration, state.gridSize);
    if (state.randomLifeActive) {
      updatedGeneration = addRandomLife(updatedGeneration, state.gridSize);
    }
    const liveCells = countLiveCells(updatedGeneration);
    return {
      ...state,
      currentGeneration: updatedGeneration,
      generationCount: state.generationCount + 1,
      liveCells
    };
  }),

  on(GameBoardActions.startTicking, (state) => {
    return {
      ...state,
      autoTicking: true
    };
  }),

  on(GameBoardActions.stopTicking, (state) => {
    return {
      ...state,
      autoTicking: false
    };
  }),

  on(GameBoardActions.setTicker, (state, { newTicker }) => {
    return {
      ...state,
      ticker: newTicker
    };
  }),

  on(GameBoardActions.setTickInterval, (state, { newTickInterval }) => {
    return {
      ...state,
      tickInterval: newTickInterval,
    };
  }),

  on(GameBoardActions.resetTickInterval, (state) => {
    return {
      ...state,
      tickInterval: initialState.tickInterval
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

  on(GameBoardActions.toggleCellLife, (state, { rowIndex, columnIndex }) => {
    const updatedGeneration = toggleCellLife(state.currentGeneration, rowIndex, columnIndex);
    const liveCells = countLiveCells(updatedGeneration);
    return {
      ...state,
      currentGeneration: updatedGeneration,
      generationCount: state.generationCount + 1,
      liveCells
    };
  }),

  on(GameBoardActions.zoomIn, (state) => {
    const gridSize = Math.max(state.minGridSize, state.gridSize - 1);
    const currentGenerationResized = resizeCurrentGeneration(state.currentGeneration, gridSize);
    const liveCells = countLiveCells(currentGenerationResized);
    return {
      ...state,
      currentGeneration: currentGenerationResized,
      gridSize,
      liveCells
    };
  }),

  on(GameBoardActions.zoomOut, (state) => {
    const gridSize = Math.min(state.maxGridSize, state.gridSize + 1);
    const currentGenerationResized = resizeCurrentGeneration(state.currentGeneration, gridSize);
    const liveCells = countLiveCells(currentGenerationResized);
    return {
      ...state,
      currentGeneration: currentGenerationResized,
      gridSize,
      liveCells
    };
  }),

  on(GameBoardActions.emptyCheck, (state) => {
    return {
      ...state
    };
  })
);

export function gameBoardReducer(state: State, action: Action) {
  return _gameBoardReducer(state, action);
}

function getNextGeneration(currentGeneration: number[][], gridSize: number) {
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

function resizeCurrentGeneration(currentGeneration: number[][], gridSize: number) {
  const currentGenerationSize = currentGeneration.length;
  const currentGenerationResized = [];
  for (let i = 0; i < gridSize; i++) {
    currentGenerationResized[i] = [];
    for (let j = 0; j < gridSize; j++) {
      if (i >= currentGenerationSize || j >= currentGenerationSize) {
        currentGenerationResized[i][j] = 0;
      } else {
        currentGenerationResized[i][j] = currentGeneration[i][j];
      }
    }
  }
  return currentGenerationResized;
}

function countLiveCells(generation: number[][]) {
  const rows = generation.length;
  const columns = generation[0].length;
  let liveCells = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      liveCells += generation[i][j];
    }
  }

  return liveCells;
}

function addRandomLife(generation: number[][], gridSize: number) {
  const randomRow = Math.floor(Math.random() * gridSize);
  const randomColumn = Math.floor(Math.random() * gridSize);
  const currentCellValue = generation[randomRow][randomColumn];
  if (currentCellValue) {
    return addRandomLife(generation, gridSize);
  } else {
    generation[randomRow][randomColumn] = 1;
    return generation;
  }
}

function getSelectedPattern(selectedPattern: string, gridSize: number) {
  let pattern = getEmptyGeneration(gridSize);

  switch (selectedPattern) {
    case 'Glider':
      pattern = getGliderPattern(gridSize);
      break;
    case 'Small Exploder':
      pattern = getSmallExploderPattern(gridSize);
      break;
    case 'Exploder':
      pattern = getExploderPattern(gridSize);
      break;
    case 'Ten Cell Row':
      pattern = getTenCellRowPattern(gridSize);
      break;
    case 'Lightweight Spaceship':
      pattern = getLightweightSpaceshipPattern(gridSize);
      break;
    case 'Block':
      pattern = getBlockPattern(gridSize);
      break;
    case 'Tub':
      pattern = getTubPattern(gridSize);
      break;
    case 'Boat':
      pattern = getBoatPattern(gridSize);
      break;
    default:
      break;
  }

  return pattern;
}

function getEmptyGeneration(gridSize: number) {
  const emptyGeneration = [];

  for (let i = 0; i < gridSize; i++) {
    emptyGeneration[i] = [];
    for (let j = 0; j < gridSize; j++) {
      emptyGeneration[i][j] = 0;
    }
  }

  return emptyGeneration;
}

function getGliderPattern(gridSize: number) {
  const gliderPattern = getEmptyGeneration(gridSize);
  const startingRow = Math.floor((gridSize - 1) / 2 - 1);
  const startingColumn = Math.floor((gridSize - 1) / 2 - 1);
  gliderPattern[startingRow][startingColumn + 1] = 1;
  gliderPattern[startingRow + 1][startingColumn + 2] = 1;
  gliderPattern[startingRow + 2][startingColumn] = 1;
  gliderPattern[startingRow + 2][startingColumn + 1] = 1;
  gliderPattern[startingRow + 2][startingColumn + 2] = 1;
  return gliderPattern;
}

function getSmallExploderPattern(gridSize: number) {
  const smallExploderPattern = getEmptyGeneration(gridSize);
  const startingRow = Math.floor((gridSize - 1) / 2 - 1);
  const startingColumn = Math.floor((gridSize - 1) / 2 - 1);
  smallExploderPattern[startingRow][startingColumn + 1] = 1;
  smallExploderPattern[startingRow + 1][startingColumn] = 1;
  smallExploderPattern[startingRow + 1][startingColumn + 1] = 1;
  smallExploderPattern[startingRow + 1][startingColumn + 2] = 1;
  smallExploderPattern[startingRow + 2][startingColumn] = 1;
  smallExploderPattern[startingRow + 2][startingColumn + 2] = 1;
  smallExploderPattern[startingRow + 3][startingColumn + 1] = 1;
  return smallExploderPattern;
}

function getExploderPattern(gridSize: number) {
  const exploderPattern = getEmptyGeneration(gridSize);
  const startingRow = Math.floor((gridSize - 1) / 2 - 2);
  const startingColumn = Math.floor((gridSize - 1) / 2 - 2);
  exploderPattern[startingRow][startingColumn] = 1;
  exploderPattern[startingRow][startingColumn + 2] = 1;
  exploderPattern[startingRow][startingColumn + 4] = 1;
  exploderPattern[startingRow + 1][startingColumn] = 1;
  exploderPattern[startingRow + 1][startingColumn + 4] = 1;
  exploderPattern[startingRow + 2][startingColumn] = 1;
  exploderPattern[startingRow + 2][startingColumn + 4] = 1;
  exploderPattern[startingRow + 3][startingColumn] = 1;
  exploderPattern[startingRow + 3][startingColumn + 4] = 1;
  exploderPattern[startingRow + 4][startingColumn] = 1;
  exploderPattern[startingRow + 4][startingColumn + 2] = 1;
  exploderPattern[startingRow + 4][startingColumn + 4] = 1;
  return exploderPattern;
}

function getTenCellRowPattern(gridSize: number) {
  const startingRow = Math.floor((gridSize - 1) / 2);
  const startingColumn = Math.floor((gridSize - 1) / 2 - 4);
  const tenCellRowPattern = getEmptyGeneration(gridSize);
  const endingColumn = startingColumn + 10;
  for (let i = startingColumn; i < endingColumn; i++) {
    tenCellRowPattern[startingRow][i] = 1;
  }

  return tenCellRowPattern;
}

function getLightweightSpaceshipPattern(gridSize: number) {
  const lightweightSpaceshipPattern = getEmptyGeneration(gridSize);
  const startingRow = Math.floor((gridSize - 1) / 2 - 1);
  const startingColumn = Math.floor((gridSize - 1) / 2 - 2);
  lightweightSpaceshipPattern[startingRow][startingColumn + 1] = 1;
  lightweightSpaceshipPattern[startingRow][startingColumn + 2] = 1;
  lightweightSpaceshipPattern[startingRow][startingColumn + 3] = 1;
  lightweightSpaceshipPattern[startingRow][startingColumn + 4] = 1;
  lightweightSpaceshipPattern[startingRow + 1][startingColumn] = 1;
  lightweightSpaceshipPattern[startingRow + 1][startingColumn + 4] = 1;
  lightweightSpaceshipPattern[startingRow + 2][startingColumn + 4] = 1;
  lightweightSpaceshipPattern[startingRow + 3][startingColumn] = 1;
  lightweightSpaceshipPattern[startingRow + 3][startingColumn + 3] = 1;
  return lightweightSpaceshipPattern;
}

function getBlockPattern(gridSize: number) {
  const blockPattern = getEmptyGeneration(gridSize);
  const startingRow = Math.floor((gridSize - 1) / 2);
  const startingColumn = Math.floor((gridSize - 1) / 2);
  blockPattern[startingRow][startingColumn] = 1;
  blockPattern[startingRow][startingColumn + 1] = 1;
  blockPattern[startingRow + 1][startingColumn] = 1;
  blockPattern[startingRow + 1][startingColumn + 1] = 1;
  return blockPattern;
}

function getTubPattern(gridSize: number) {
  const tubPattern = getEmptyGeneration(gridSize);
  const startingRow = Math.floor((gridSize - 1) / 2 - 1);
  const startingColumn = Math.floor((gridSize - 1) / 2 - 1);
  tubPattern[startingRow][startingColumn + 1] = 1;
  tubPattern[startingRow + 1][startingColumn] = 1;
  tubPattern[startingRow + 1][startingColumn + 2] = 1;
  tubPattern[startingRow + 2][startingColumn + 1] = 1;
  return tubPattern;
}

function getBoatPattern(gridSize: number) {
  const boatPattern = getEmptyGeneration(gridSize);
  const startingRow = Math.floor((gridSize - 1) / 2 - 1);
  const startingColumn = Math.floor((gridSize - 1) / 2 - 1);
  boatPattern[startingRow][startingColumn + 1] = 1;
  boatPattern[startingRow + 1][startingColumn] = 1;
  boatPattern[startingRow + 1][startingColumn + 2] = 1;
  boatPattern[startingRow + 2][startingColumn + 1] = 1;
  boatPattern[startingRow + 2][startingColumn + 2] = 1;
  return boatPattern;
}
