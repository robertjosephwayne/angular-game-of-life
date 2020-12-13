import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.state';

import * as TickerActions from '../store/ticker/ticker.actions';

@Injectable({ providedIn: 'root' })
export class TickerService {
  constructor(private store: Store<AppState>) { }

  createAutoTicker(tickInterval: number): void {
    const newTicker = this.getNewTicker(tickInterval);
    this.store.dispatch(TickerActions.createAutoTickerSuccess({ newTicker }));
  }

  clearAutoTicker(activeTicker: any): void {
    clearInterval(activeTicker);
    this.store.dispatch(TickerActions.clearAutoTickerSuccess());
  }

  private getNewTicker(tickInterval): any {
    setInterval(() => {
      this.store.dispatch(TickerActions.autoTick());
    }, tickInterval);
  }

  replaceActiveAutoTicker(activeTicker: any, tickInterval: number): void {
    this.clearAutoTicker(activeTicker);
    this.createAutoTicker(tickInterval);
  }
}


