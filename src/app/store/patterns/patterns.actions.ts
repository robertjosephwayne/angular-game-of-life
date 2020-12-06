import { createAction, props } from '@ngrx/store';

export const setSelectedPattern = createAction(
  '[Patterns Component] Set Selected Pattern',
  props<{ patternName: string }>()
);

export const resetSelectedPattern = createAction(
  '[Game Buttons Component] Reset Selected Pattern'
);
