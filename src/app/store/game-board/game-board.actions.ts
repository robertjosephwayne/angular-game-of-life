import { createAction, props } from '@ngrx/store';
import { LifeGeneration } from 'src/app/models/life-generation.model';

export const toggleCellLife = createAction(
  '[Game Board | Game Board Component] Toggle Cell Life',
  props<{ rowIndex: number, columnIndex: number }>()
);

export const zoomIn = createAction(
  '[Game Board | Game Buttons Component] Zoom In'
);

export const zoomOut = createAction(
  '[Game Board | Game Buttons Component] Zoom Out'
);

export const reset = createAction(
  '[Game Board | Game Buttons Component] Reset'
);

export const activateRandomLife = createAction(
  '[Game Board | Game Config Component] Activate Random Life'
);

export const disableRandomLife = createAction(
  '[Game Board | Game Config Component] Disable Random Life'
);

export const setCurrentGeneration = createAction(
  '[Game Board | Patterns Component] Set Current Generation',
  props<{ newGeneration: LifeGeneration }>()
);

export const nextGeneration = createAction(
  '[Game Board | Game Board Effect] Next Generation'
);
