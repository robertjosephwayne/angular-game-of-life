import { mockState } from '../app.state';

import * as fromPatterns from './patterns.selectors';
import { initialState, PatternsState } from './patterns.state';

describe('Patterns Selectors', () => {
  describe('selectPatterns', () => {
    it('should return the patterns state', () => {
      const appState = mockState();
      expect(fromPatterns.selectPatterns(appState)).toEqual(initialState);
    });
  });

  describe('selectPresetPatterns', () => {
    it('should return the array of preset patterns', () => {
      const testPresetPatterns = [
        'Empty',
        'Glider',
        'Tub'
      ];

      const state: PatternsState = {
        ...initialState,
        presetPatterns: testPresetPatterns
      };

      const presetPatterns = fromPatterns
        .selectPresetPatterns
        .projector(state);

      expect(presetPatterns).toBe(testPresetPatterns);
    });
  });

  describe('selectedPattern', () => {
    it('should return the selected pattern', () => {
      const state: PatternsState = {
        ...initialState,
        selectedPattern: 'Test Pattern Name'
      };

      const selectedPattern = fromPatterns
        .selectedPattern
        .projector(state);

      expect(selectedPattern).toBe('Test Pattern Name');
    });
  });
})
