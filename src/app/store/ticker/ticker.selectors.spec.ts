import { mockState } from '../app.state';

import * as fromTicker from './ticker.selectors';
import { initialState, TickerState } from './ticker.state';

describe('Ticker Selectors', () => {

  describe('selectTicker', () => {
    it('should return the ticker state', () => {
      const appState = mockState();
      expect(fromTicker.selectTicker(appState)).toEqual(initialState);
    });
  });

  describe('selectActiveTicker', () => {
    it('should return the active ticker', () => {
      const testTicker = setInterval(() => {
        return;
      }, 100000);

      const state: TickerState = {
        ...initialState,
        activeTicker: testTicker
      };

      const activeTicker = fromTicker
        .selectActiveTicker
        .projector(state);

      expect(activeTicker).toBe(testTicker);
    });
  });

  describe('isTicking', () => {
    it('should return true if there is an active ticker', () => {
      const testTicker = setInterval(() => {
        return;
      }, 100000);

      const isTicking = fromTicker
        .isTicking
        .projector(testTicker);

      expect(isTicking).toBeTrue();
    });

})
