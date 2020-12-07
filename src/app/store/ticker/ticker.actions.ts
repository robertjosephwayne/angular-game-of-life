import { createAction, props } from '@ngrx/store';

export const resetTickInterval = createAction(
  '[Game Buttons Component] Reset Tick Interval'
);

export const startTicking = createAction(
  '[Game Config Component] Start Ticking',
);

export const stopTicking = createAction(
  '[Game Config] Stop Ticking'
);

export const setTickInterval = createAction(
  '[Game Config Component] Set Tick Interval',
  props<{ newTickInterval: number }>()
);

export const setTicker = createAction(
  '[Ticker Effect] Set Ticker',
  props<{ newTicker: any }>()
);

export const clearTicker = createAction(
  '[Ticker Effect] Clear Ticker',
);

export const autoTick = createAction(
  '[Ticker Effect] Auto Tick'
);

export const manualTick = createAction(
  '[Game Buttons Component] Manual Tick'
);
