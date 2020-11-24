import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../game-board/store/game-board.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.css']
})
export class PatternsComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  gridSize: number;
  presetPatterns: string[];
  selectedPattern: string;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData() {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.gridSize = state.gridSize;
      this.selectedPattern = state.selectedPattern;
      this.presetPatterns = state.presetPatterns;
    });
  }

  handlePatternSelect(patternName) {
    this.store.dispatch(GameBoardActions.setSelectedPattern({ patternName }));

    const selectedPattern = this.getSelectedPattern();
    this.store.dispatch(GameBoardActions.setCurrentGeneration({ newGeneration: selectedPattern }))
  }

  getSelectedPattern() {
    let pattern = this.getEmptyGeneration();

    switch (this.selectedPattern) {
      case 'Glider':
        pattern = this.getGliderPattern();
        break;
      case 'Small Exploder':
        pattern = this.getSmallExploderPattern();
        break;
      case 'Exploder':
        pattern = this.getExploderPattern();
        break;
      case 'Ten Cell Row':
        pattern = this.getTenCellRowPattern();
        break;
      case 'Lightweight Spaceship':
        pattern = this.getLightweightSpaceshipPattern();
        break;
      case 'Block':
        pattern = this.getBlockPattern();
        break;
      case 'Tub':
        pattern = this.getTubPattern();
        break;
      case 'Boat':
        pattern = this.getBoatPattern();
        break;
      default:
        break;
    }

    return pattern;
  }

  getEmptyGeneration() {
    const emptyGeneration = [];

    for (let i = 0; i < this.gridSize; i++) {
      emptyGeneration[i] = [];
      for (let j = 0; j < this.gridSize; j++) {
        emptyGeneration[i][j] = 0;
      }
    }

    return emptyGeneration;
  }

  getGliderPattern() {
    const gliderPattern = this.getEmptyGeneration();
    const startingRow = Math.floor((this.gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((this.gridSize - 1) / 2 - 1);
    gliderPattern[startingRow][startingColumn + 1] = 1;
    gliderPattern[startingRow + 1][startingColumn + 2] = 1;
    gliderPattern[startingRow + 2][startingColumn] = 1;
    gliderPattern[startingRow + 2][startingColumn + 1] = 1;
    gliderPattern[startingRow + 2][startingColumn + 2] = 1;
    return gliderPattern;
  }

  getSmallExploderPattern() {
    const smallExploderPattern = this.getEmptyGeneration();
    const startingRow = Math.floor((this.gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((this.gridSize - 1) / 2 - 1);
    smallExploderPattern[startingRow][startingColumn + 1] = 1;
    smallExploderPattern[startingRow + 1][startingColumn] = 1;
    smallExploderPattern[startingRow + 1][startingColumn + 1] = 1;
    smallExploderPattern[startingRow + 1][startingColumn + 2] = 1;
    smallExploderPattern[startingRow + 2][startingColumn] = 1;
    smallExploderPattern[startingRow + 2][startingColumn + 2] = 1;
    smallExploderPattern[startingRow + 3][startingColumn + 1] = 1;
    return smallExploderPattern;
  }

  getExploderPattern() {
    const exploderPattern = this.getEmptyGeneration();
    const startingRow = Math.floor((this.gridSize - 1) / 2 - 2);
    const startingColumn = Math.floor((this.gridSize - 1) / 2 - 2);
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

  getTenCellRowPattern() {
    const startingRow = Math.floor((this.gridSize - 1) / 2);
    const startingColumn = Math.floor((this.gridSize - 1) / 2 - 4);
    const tenCellRowPattern = this.getEmptyGeneration();
    const endingColumn = startingColumn + 10;
    for (let i = startingColumn; i < endingColumn; i++) {
      tenCellRowPattern[startingRow][i] = 1;
    }

    return tenCellRowPattern;
  }

  getLightweightSpaceshipPattern() {
    const lightweightSpaceshipPattern = this.getEmptyGeneration();
    const startingRow = Math.floor((this.gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((this.gridSize - 1) / 2 - 2);
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

  getBlockPattern() {
    const blockPattern = this.getEmptyGeneration();
    const startingRow = Math.floor((this.gridSize - 1) / 2);
    const startingColumn = Math.floor((this.gridSize - 1) / 2);
    blockPattern[startingRow][startingColumn] = 1;
    blockPattern[startingRow][startingColumn + 1] = 1;
    blockPattern[startingRow + 1][startingColumn] = 1;
    blockPattern[startingRow + 1][startingColumn + 1] = 1;
    return blockPattern;
  }

  getTubPattern() {
    const tubPattern = this.getEmptyGeneration();
    const startingRow = Math.floor((this.gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((this.gridSize - 1) / 2 - 1);
    tubPattern[startingRow][startingColumn + 1] = 1;
    tubPattern[startingRow + 1][startingColumn] = 1;
    tubPattern[startingRow + 1][startingColumn + 2] = 1;
    tubPattern[startingRow + 2][startingColumn + 1] = 1;
    return tubPattern;
  }

  getBoatPattern() {
    const boatPattern = this.getEmptyGeneration();
    const startingRow = Math.floor((this.gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((this.gridSize - 1) / 2 - 1);
    boatPattern[startingRow][startingColumn + 1] = 1;
    boatPattern[startingRow + 1][startingColumn] = 1;
    boatPattern[startingRow + 1][startingColumn + 2] = 1;
    boatPattern[startingRow + 2][startingColumn + 1] = 1;
    boatPattern[startingRow + 2][startingColumn + 2] = 1;
    return boatPattern;
  }

  ngOnDestroy() {
    this.gameBoardSub.unsubscribe();
  }
}
