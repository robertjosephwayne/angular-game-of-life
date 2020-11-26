import { createAction, props } from '@ngrx/store';

export const tick = createAction('[Game Board] Tick');

export const toggleCellLife = createAction(
  '[Game Board] Toggle Cell Life',
  props<{ rowIndex: number, columnIndex: number }>()
);

export const resetGeneration = createAction('[Game Board] Reset Generation');

export const setGridSize = createAction(
  '[Game Board] Set Grid Size',
  props<{ gridSize: number }>()
);

export const resetGridSize = createAction(
  '[Game Board] Reset Grid Size'
);

export const setSelectedPattern = createAction(
  '[Game Board] Set Selected Pattern',
  props<{ patternName: string }>()
);

export const startTicking = createAction(
  '[Game Board] Start Ticking',
);

export const setTicker = createAction(
  '[Game Board] Set Ticker',
  props<{ newTicker: any }>()
);

export const stopTicking = createAction('[Game Board] Stop Ticking');

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

export const setCurrentGeneration = createAction(
  '[Game Board] Set Current Generation',
  props<{ newGeneration: number[][] }>()
);

