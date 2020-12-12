import { createAction, props } from '@ngrx/store';

export const startTicking = createAction(
  '[Ticker | Game Buttons Component] Start Ticking',
);

export const manualTick = createAction(
  '[Ticker | Game Buttons Component] Manual Tick'
);

export const pause = createAction(
  '[Ticker | Game Buttons Component] Pause'
);

export const setTickSpeed = createAction(
  '[Ticker | Game Config Component] Set Tick Speed',
  props<{ newTickSpeed: number }>()
);

export const updateActiveTickInterval = createAction(
  '[Ticker | Ticker Effect] Update Active Tick Interval'
);

export const stopTicking = createAction(
  '[Ticker | Ticker Effect] Stop Ticking'
);

export const setTicker = createAction(
  '[Ticker | Ticker Effect] Set Ticker',
  props<{ newTicker: any }>()
);

export const clearTicker = createAction(
  '[Ticker | Ticker Effect] Clear Ticker',
);

export const autoTick = createAction(
  '[Ticker | Ticker Effect] Auto Tick'
);

export const resetTickSpeed = createAction(
  '[Ticker | Ticker Effect] Reset Tick Speed'
);

export const tick = createAction(
  '[Ticker | Ticker Effect] Tick'
);
