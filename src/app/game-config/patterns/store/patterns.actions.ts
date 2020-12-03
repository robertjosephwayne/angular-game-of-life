import { createAction, props } from '@ngrx/store';

export const setSelectedPattern = createAction(
  '[Patterns] Set Selected Pattern',
  props<{ patternName: string }>()
);

export const resetSelectedPattern = createAction(
  '[Patterns] Reset Selected Pattern'
);
