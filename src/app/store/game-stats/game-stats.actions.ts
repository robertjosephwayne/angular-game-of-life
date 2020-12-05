import { createAction, props } from '@ngrx/store';

export const incrementGenerationCount = createAction(
  '[Game Stats] Increment Generation Count'
);

export const resetGenerationCount = createAction(
  '[Game Stats] Reset Generation Count'
);

export const updateLiveCellCount = createAction(
  '[Game Stats] Update Live Cell Count'
);

export const setLiveCellCount = createAction(
  '[Game Stats] Set Live Cell Count',
  props<{ liveCells: number }>()
)
