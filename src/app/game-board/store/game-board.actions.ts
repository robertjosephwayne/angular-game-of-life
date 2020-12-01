import { createAction, props } from '@ngrx/store';

export const resetGeneration = createAction(
  '[Game Board] Reset Generation'
);

export const setSelectedPattern = createAction(
  '[Game Board] Set Selected Pattern',
  props<{ patternName: string }>()
);

export const setGridSize = createAction(
  '[Game Board] Set Grid Size',
  props<{ gridSize: number }>()
);

export const resetGridSize = createAction(
  '[Game Board] Reset Grid Size'
);

export const tick = createAction(
  '[Game Board] Tick'
);

export const startTicking = createAction(
  '[Game Board] Start Ticking',
);

export const stopTicking = createAction(
  '[Game Board] Stop Ticking'
);

export const setTicker = createAction(
  '[Game Board] Set Ticker',
  props<{ newTicker: any }>()
);

export const setTickInterval = createAction(
  '[Game Board] Set Tick Interval',
  props<{ newTickInterval: number }>()
);

export const resetTickInterval = createAction(
  '[Game Board] Reset Tick Interval'
);

export const activateRandomLife = createAction(
  '[Game Board] Activate Random Life'
);

export const disableRandomLife = createAction(
  '[Game Board] Disable Random Life'
);

export const toggleCellLife = createAction(
  '[Game Board] Toggle Cell Life',
  props<{ rowIndex: number, columnIndex: number }>()
);

export const zoomIn = createAction(
  '[Game Board] Zoom In'
);

export const zoomOut = createAction(
  '[Game Board] Zoom Out'
);

export const emptyCheck = createAction(
  '[Game Board] Empty Check'
);
