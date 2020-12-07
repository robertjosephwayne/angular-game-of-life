import { createAction, props } from '@ngrx/store';

export const resetTickInterval = createAction(
  '[Ticker Effect] Reset Tick Interval'
);

export const startTicking = createAction(
  '[Game Buttons Component] Start Ticking',
);

export const updateActiveTickInterval = createAction(
  '[Ticker Effect] Update Active Tick Interval'
);

export const pause = createAction(
  '[Game Buttons Component] Pause'
);

export const stopTicking = createAction(
  '[Ticker Effect] Stop Ticking'
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
