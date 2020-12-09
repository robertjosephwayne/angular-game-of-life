import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const selectPatterns = (state: AppState) => state.patterns;

export const selectPresetPatterns = createSelector(
  selectPatterns,
  patterns => patterns.presetPatterns
);

export const selectedPattern = createSelector(
  selectPatterns,
  patterns => patterns.selectedPattern
);
