import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../app.state';

import * as fromPatterns from '../patterns/patterns.selectors';
import * as fromGameBoard from '../game-board/game-board.selectors';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as PatternsActions from '../patterns/patterns.actions';

@Injectable()
export class PatternsEffects {

  resetSelectedPattern$ = createEffect(() => this.actions$.pipe(
    ofType(GameBoardActions.reset),
    map(() => PatternsActions.resetSelectedPattern())
  ));

  updateCurrentGeneration$ = createEffect(() => this.actions$.pipe(
    ofType(
      PatternsActions.setSelectedPattern,
      PatternsActions.resetSelectedPattern
    ),
    withLatestFrom(this.store.select(fromPatterns.selectedPattern)),
    withLatestFrom(this.store.select(fromGameBoard.selectGridSize)),
    map(([[action, selectedPattern], gridSize]) => {
      const newGeneration = getSelectedPattern(selectedPattern, gridSize);
      return GameBoardActions.setCurrentGeneration({ newGeneration });
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) { }
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
