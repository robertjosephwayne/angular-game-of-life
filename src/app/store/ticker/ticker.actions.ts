import { createAction, props } from '@ngrx/store';

export const startTicking = createAction(
  '[Game Buttons Component] Start Ticking',
);

export const manualTick = createAction(
  '[Game Buttons Component] Manual Tick'
);

export const pause = createAction(
  '[Game Buttons Component] Pause'
);

export const setTickSpeed = createAction(
  '[Game Config Component] Set Tick Speed',
  props<{ newTickSpeed: number }>()
);

export const updateActiveTickInterval = createAction(
  '[Ticker Effect] Update Active Tick Interval'
);

export const stopTicking = createAction(
  '[Ticker Effect] Stop Ticking'
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

export const resetTickSpeed = createAction(
  '[Ticker Effect] Reset Tick Speed'
);

export const tick = createAction(
  '[Ticker Effect] Tick'
);
