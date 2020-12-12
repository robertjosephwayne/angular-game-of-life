import { createAction, props } from '@ngrx/store';

export const setSelectedPattern = createAction(
  '[Patterns | Patterns Component] Set Selected Pattern',
  props<{ patternName: string }>()
);

export const resetSelectedPattern = createAction(
  '[Patterns | Patterns Effect] Reset Selected Pattern'
);
