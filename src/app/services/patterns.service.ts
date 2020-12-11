import { Injectable } from '@angular/core';

import { LifeGeneration } from '../models/life-generation.model';

@Injectable({ providedIn: 'root' })
export class PatternsService {
  constructor() { }

  createPattern(patternName: string, gridSize: number): LifeGeneration {
    patternName = patternName.toLowerCase();
    let result = this.createEmptyGeneration(gridSize);

    switch (patternName) {
      case 'glider':
        result = this.createGliderPattern(gridSize);
        break;
      case 'small exploder':
        result = this.createSmallExploderPattern(gridSize);
        break;
      case 'exploder':
        result = this.createExploderPattern(gridSize);
        break;
      case 'ten cell row':
        result = this.createTenCellRowPattern(gridSize);
        break;
      case 'lightweight spaceship':
        result = this.createLightweightSpaceshipPattern(gridSize);
        break;
      case 'block':
        result = this.createBlockPattern(gridSize);
        break;
      case 'tub':
        result = this.createTubPattern(gridSize);
        break;
      case 'boat':
        result = this.createBoatPattern(gridSize);
        break;
      default:
        break;
    }

    return result;
  }

  private createEmptyGeneration(gridSize: number): LifeGeneration {
    const emptyGeneration = [];

    for (let i = 0; i < gridSize; i++) {
      emptyGeneration[i] = [];
      for (let j = 0; j < gridSize; j++) {
        emptyGeneration[i][j] = 0;
      }
    }

    return emptyGeneration;
  }

  private createGliderPattern(gridSize: number): LifeGeneration {
    const gliderPattern = this.createEmptyGeneration(gridSize);
    const startingRow = Math.floor((gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((gridSize - 1) / 2 - 1);
    gliderPattern[startingRow][startingColumn + 1] = 1;
    gliderPattern[startingRow + 1][startingColumn + 2] = 1;
    gliderPattern[startingRow + 2][startingColumn] = 1;
    gliderPattern[startingRow + 2][startingColumn + 1] = 1;
    gliderPattern[startingRow + 2][startingColumn + 2] = 1;
    return gliderPattern;
  }

  private createSmallExploderPattern(gridSize: number): LifeGeneration {
    const smallExploderPattern = this.createEmptyGeneration(gridSize);
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

  private createExploderPattern(gridSize: number): LifeGeneration {
    const exploderPattern = this.createEmptyGeneration(gridSize);
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

  private createTenCellRowPattern(gridSize: number): LifeGeneration {
    const startingRow = Math.floor((gridSize - 1) / 2);
    const startingColumn = Math.floor((gridSize - 1) / 2 - 4);
    const tenCellRowPattern = this.createEmptyGeneration(gridSize);
    const endingColumn = startingColumn + 10;
    for (let i = startingColumn; i < endingColumn; i++) {
      tenCellRowPattern[startingRow][i] = 1;
    }

    return tenCellRowPattern;
  }

  private createLightweightSpaceshipPattern(gridSize: number): LifeGeneration {
    const lightweightSpaceshipPattern = this.createEmptyGeneration(gridSize);
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

  private createBlockPattern(gridSize: number): LifeGeneration {
    const blockPattern = this.createEmptyGeneration(gridSize);
    const startingRow = Math.floor((gridSize - 1) / 2);
    const startingColumn = Math.floor((gridSize - 1) / 2);
    blockPattern[startingRow][startingColumn] = 1;
    blockPattern[startingRow][startingColumn + 1] = 1;
    blockPattern[startingRow + 1][startingColumn] = 1;
    blockPattern[startingRow + 1][startingColumn + 1] = 1;
    return blockPattern;
  }

  private createTubPattern(gridSize: number): LifeGeneration {
    const tubPattern = this.createEmptyGeneration(gridSize);
    const startingRow = Math.floor((gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((gridSize - 1) / 2 - 1);
    tubPattern[startingRow][startingColumn + 1] = 1;
    tubPattern[startingRow + 1][startingColumn] = 1;
    tubPattern[startingRow + 1][startingColumn + 2] = 1;
    tubPattern[startingRow + 2][startingColumn + 1] = 1;
    return tubPattern;
  }

  private createBoatPattern(gridSize: number): LifeGeneration {
    const boatPattern = this.createEmptyGeneration(gridSize);
    const startingRow = Math.floor((gridSize - 1) / 2 - 1);
    const startingColumn = Math.floor((gridSize - 1) / 2 - 1);
    boatPattern[startingRow][startingColumn + 1] = 1;
    boatPattern[startingRow + 1][startingColumn] = 1;
    boatPattern[startingRow + 1][startingColumn + 2] = 1;
    boatPattern[startingRow + 2][startingColumn + 1] = 1;
    boatPattern[startingRow + 2][startingColumn + 2] = 1;
    return boatPattern;
  };
}


