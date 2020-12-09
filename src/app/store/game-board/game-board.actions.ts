import { createAction, props } from '@ngrx/store';
import { LifeGeneration } from 'src/app/models/life-generation.model';

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

export const reset = createAction(
  '[Game Buttons Component] Reset'
);

export const activateRandomLife = createAction(
  '[Game Config Component] Activate Random Life'
);

export const disableRandomLife = createAction(
  '[Game Config Component] Disable Random Life'
);

export const setCurrentGeneration = createAction(
  '[Patterns Component] Set Current Generation',
  props<{ newGeneration: LifeGeneration }>()
);

export const nextGeneration = createAction(
  '[Game Board Effect] Next Generation'
);
