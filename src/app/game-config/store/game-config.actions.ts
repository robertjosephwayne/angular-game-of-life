import { createAction, props } from '@ngrx/store';

export const startTicking = createAction(
  '[Game Config] Start Ticking',
);

export const stopTicking = createAction(
  '[Game Config] Stop Ticking'
);

export const setTicker = createAction(
  '[Game Config] Set Ticker',
  props<{ newTicker: any }>()
);

export const clearTicker = createAction(
  '[Game Config] Clear Ticker',
);

export const setTickInterval = createAction(
  '[Game Config] Set Tick Interval',
  props<{ newTickInterval: number }>()
);

export const resetTickInterval = createAction(
  '[Game Config] Reset Tick Interval'
);

export const emptyGenerationCheck = createAction(
  '[Game Config] Empty Generation Check'
);

export const activateRandomLife = createAction(
  '[Game Config] Activate Random Life'
);

export const disableRandomLife = createAction(
  '[Game Config] Disable Random Life'
);

export const resetGridSize = createAction(
  '[Game Config] Reset Grid Size'
);

export const zoomIn = createAction(
  '[Game Config] Zoom In'
);

export const zoomOut = createAction(
  '[Game Config] Zoom Out'
);
