import { createSelector } from '@ngrx/store';

import * as fromApp from '../app.reducer';


export const selectPatterns = (state: fromApp.AppState) => state.patterns;

export const selectPresetPatterns = createSelector(
  selectPatterns,
  patterns => patterns.presetPatterns
);

export const selectedPattern = createSelector(
  selectPatterns,
  patterns => patterns.selectedPattern
);
