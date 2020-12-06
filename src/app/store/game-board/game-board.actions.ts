import { createAction, props } from '@ngrx/store';

export const tick = createAction(
  '[Game Board] Tick'
);

export const toggleCellLife = createAction(
  '[Game Board Component] Toggle Cell Life',
  props<{ rowIndex: number, columnIndex: number }>()
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

export const activateRandomLife = createAction(
  '[Game Config] Activate Random Life'
);

export const disableRandomLife = createAction(
  '[Game Config] Disable Random Life'
);

export const autoTick = createAction(
  '[Ticker Effect] Auto Tick'
);
