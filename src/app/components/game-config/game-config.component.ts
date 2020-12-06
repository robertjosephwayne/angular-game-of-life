import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as TickerActions from '../../store/ticker/ticker.actions';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit, OnDestroy {
  tickerSub: Subscription;
  tickInterval: number;
  maxTickInterval: number;
  activeTicker: any;
  randomLifeActive: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setTickerData();
  }

  setTickerData(): void {
    this.tickerSub = this.store.select('ticker').subscribe(state => {
      this.maxTickInterval = state.maxTickInterval;
      this.activeTicker = state.activeTicker;
      this.tickInterval = state.tickInterval;
      this.randomLifeActive = state.randomLifeActive;
    });
  }

  handleSpeedChange(tickSpeed: number): void {
    const newTickInterval = this.getTickInterval(tickSpeed);
    this.store.dispatch(TickerActions.setTickInterval({ newTickInterval }));
    if (this.activeTicker) this.store.dispatch(TickerActions.startTicking());
  }

  handleRandomLifeToggle(randomLifeEnabled: boolean): void {
    if (randomLifeEnabled) {
      this.store.dispatch(TickerActions.activateRandomLife());
    } else {
      this.store.dispatch(TickerActions.disableRandomLife());
    }
  }

  getTickInterval(tickSpeed: number): number {
    return this.maxTickInterval - tickSpeed;
  }

  get tickSpeed(): number {
    return this.maxTickInterval - this.tickInterval;
  }

  ngOnDestroy(): void {
    this.tickerSub.unsubscribe();
  }
}
