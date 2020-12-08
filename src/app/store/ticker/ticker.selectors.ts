import { createSelector } from '@ngrx/store';

import * as fromApp from '../app.reducer';

export const selectTicker = (state: fromApp.AppState) => state.ticker;

export const isTickerActive = createSelector(
  selectTicker,
  ticker => !!ticker.activeTicker
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
