import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const selectTicker = (state: AppState) => state.ticker;

export const isTicking = createSelector(
  selectTicker,
  ticker => !!ticker.activeTicker
);

export const selectActiveTicker = createSelector(
  selectTicker,
  ticker => ticker.activeTicker
);

export const selectMaxTickInterval = createSelector(
  selectTicker,
  ticker => ticker.maxTickInterval
);

export const selectTickSpeed = createSelector(
  selectTicker,
  ticker => ticker.tickSpeed
);

export const selectTickInterval = createSelector(
  selectMaxTickInterval,
  selectTickSpeed,
  (maxTickInterval, tickSpeed) => maxTickInterval - tickSpeed
);
