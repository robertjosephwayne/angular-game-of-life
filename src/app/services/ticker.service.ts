import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as TickerActions from '../store/ticker/ticker.actions';

@Injectable({ providedIn: 'root' })
export class TickerService {
  constructor(private store: Store) { }

  startTicking(interval: number): void {
    const ticker = setInterval(() => {
      this.store.dispatch(TickerActions.autoTick());
    }, interval);
    this.store.dispatch(TickerActions.setTicker({ newTicker: ticker }));
  }

  stopTicking(): void {

  }

  continueTickingNewSpeed(): void {

  }
}
