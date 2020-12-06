import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameConfigActions from '../../store/game-config/game-config.actions';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit, OnDestroy {
  gameConfigSub: Subscription;
  tickInterval: number;
  maxTickInterval: number;
  ticker: any;
  randomLifeActive: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameConfigData();
  }

  setGameConfigData(): void {
    this.gameConfigSub = this.store.select('gameConfig').subscribe(state => {
      this.maxTickInterval = state.maxTickInterval;
      this.ticker = state.ticker;
      this.tickInterval = state.tickInterval;
      this.randomLifeActive = state.randomLifeActive;
    });
  }

  handleSpeedChange(tickSpeed: number): void {
    const newTickInterval = this.getTickInterval(tickSpeed);
    this.store.dispatch(GameConfigActions.setTickInterval({ newTickInterval }));
    if (this.ticker) this.store.dispatch(GameConfigActions.startTicking());
  }

  handleRandomLifeToggle(randomLifeEnabled: boolean): void {
    if (randomLifeEnabled) {
      this.store.dispatch(GameConfigActions.activateRandomLife());
    } else {
      this.store.dispatch(GameConfigActions.disableRandomLife());
    }
  }

  getTickInterval(tickSpeed: number): number {
    return this.maxTickInterval - tickSpeed;
  }

  get tickSpeed(): number {
    return this.maxTickInterval - this.tickInterval;
  }

  ngOnDestroy(): void {
    this.gameConfigSub.unsubscribe();
  }
}
