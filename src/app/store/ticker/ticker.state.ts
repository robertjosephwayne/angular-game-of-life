export interface TickerState {
  maxTickInterval: number;
  tickSpeed: number;
  activeTicker: any;
}

export const initialState: TickerState = {
  maxTickInterval: 1000,
  tickSpeed: 500,
  activeTicker: null
};
