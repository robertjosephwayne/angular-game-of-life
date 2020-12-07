import { createAction, props } from '@ngrx/store';

export const nextGeneration = createAction(
  '[Ticker Effect] Next Generation'
);

export const toggleCellLife = createAction(
  '[Game Board Component] Toggle Cell Life',
  props<{ rowIndex: number, columnIndex: number }>()
);

export const zoomIn = createAction(
  '[Game Buttons Component] Zoom In'
);

export const zoomOut = createAction(
  '[Game Buttons Component] Zoom Out'
);

export const activateRandomLife = createAction(
  '[Game Config Component] Activate Random Life'
);

export const disableRandomLife = createAction(
  '[Game Config Component] Disable Random Life'
);

export const setCurrentGeneration = createAction(
  '[Patterns Component] Set Current Generation',
  props<{ newGeneration: number[][] }>()
);

export const autoTick = createAction(
  '[Ticker Effect] Auto Tick'
);
