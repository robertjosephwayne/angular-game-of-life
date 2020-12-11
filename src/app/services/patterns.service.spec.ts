import { LifeGeneration } from 'src/app/models/life-generation.model';

import { PatternsService } from './patterns.service';

describe('Patterns Service', () => {
  let service: PatternsService;

  beforeEach(() => {
    service = new PatternsService();
  });

  describe('createPattern function', () => {
    it('should not be sensitive to the case of the pattern name', () => {
      const testPatternName = 'BLOCK';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return an empty pattern if the pattern name is invalid', () => {
      const testPatternName = 'Invalid Pattern Name';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the empty pattern', () => {
      const testPatternName = 'Empty';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the glider pattern', () => {
      const testPatternName = 'Glider';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the small exploder pattern', () => {
      const testPatternName = 'Small Exploder';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the exploder pattern', () => {
      const testPatternName = 'Exploder';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the ten cell row pattern', () => {
      const testPatternName = 'Ten Cell Row';
      const testGridSize = 10;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the lightweight spaceship pattern', () => {
      const testPatternName = 'Lightweight Spaceship';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 1, 0]
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the block pattern', () => {
      const testPatternName = 'Block';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the tub pattern', () => {
      const testPatternName = 'Tub';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should correctly create the boat pattern', () => {
      const testPatternName = 'Boat';
      const testGridSize = 5;

      const expectedResult: LifeGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ];

      const actualResult = service.createPattern(testPatternName, testGridSize);

      expect(actualResult).toEqual(expectedResult);
    });
  });
});
