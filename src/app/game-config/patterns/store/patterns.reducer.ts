import { Action, createReducer, on } from '@ngrx/store';

import * as PatternsActions from './patterns.actions';

export interface State {
  presetPatterns: string[];
  selectedPattern: string;
}

export const initialState: State = {
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
  selectedPattern: 'Empty'
};

const _patternsReducer = createReducer(
  initialState,

  on(PatternsActions.setSelectedPattern, (state, { patternName }) => {
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

export function patternsReducer(state: State, action: Action) {
  return _patternsReducer(state, action);
}
