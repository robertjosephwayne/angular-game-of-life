import { Action, createReducer, on } from '@ngrx/store';

import { PatternsState, initialState } from './patterns.state';

import * as PatternsActions from './patterns.actions';

const _patternsReducer = createReducer(
  initialState,

  on(PatternsActions.setSelectedPattern, (state, { patternName }) => {
    if (!state.presetPatterns.includes(patternName)) {
      patternName = state.selectedPattern;
    }

    return {
      ...state,
      selectedPattern: patternName
    };
  }),

  on(PatternsActions.resetSelectedPattern, (state) => {
    return {
      ...state,
      selectedPattern: initialState.selectedPattern
    };
  })
);

export function patternsReducer(state: PatternsState, action: Action) {
  return _patternsReducer(state, action);
}
