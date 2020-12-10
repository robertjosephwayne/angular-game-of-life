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
})
