import { createAction, props } from '@ngrx/store';

export const tick = createAction('[Game Board Component] Tick');

export const toggleCellLife = createAction(
  '[Game Board Component] Toggle Cell Life',
  props<{ rowIndex: number, columnIndex: number }>()
);

export const reset = createAction('[Game Board Component] Reset');

export const setGridSize = createAction(
  '[Game Board Component] Set Grid Size',
  props<{ gridSize: number }>()
);

export const selectPattern = createAction(
  '[Game Board Component] Select Pattern',
  props<{ patternName: string }>()
);

