import { createAction, props } from '@ngrx/store';

export const setSelectedPattern = createAction(
  '[Patterns Component] Set Selected Pattern',
  props<{ patternName: string }>()
);

export const resetSelectedPattern = createAction(
  '[Patterns Effect] Reset Selected Pattern'
);
