import { createAction, props } from '@ngrx/store';

export const tick = createAction(
  '[Game Board] Tick'
);

export const addRandomLiveCell = createAction(
  '[Game Board] Add Random Live Cell'
);

export const toggleCellLife = createAction(
  '[Game Board] Toggle Cell Life',
  props<{ rowIndex: number, columnIndex: number }>()
);

export const resizeCurrentGeneration = createAction(
  '[Game Board] Resize Current Generation',
  props<{ newSize: number }>()
);

export const setCurrentGeneration = createAction(
  '[Game Board] Set Current Generation',
  props<{ newGeneration: number[][] }>()
);

export const zoomIn = createAction(
  '[Game Config] Zoom In'
);

export const zoomOut = createAction(
  '[Game Config] Zoom Out'
);
