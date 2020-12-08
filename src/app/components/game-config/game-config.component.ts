import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../../store/game-board/game-board.actions';
import * as TickerActions from '../../store/ticker/ticker.actions';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
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

  setGameBoardData(): void {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.randomLifeActive = state.randomLifeActive;
    });
  }

  setTickerData(): void {
    this.tickerSub = this.store.select('ticker').subscribe(state => {
      this.maxTickInterval = state.maxTickInterval;
      this.activeTicker = state.activeTicker;
      this.tickInterval = state.tickInterval;
    });
  }

  handleSpeedChange(tickSpeed: number): void {
    const newTickInterval = this.getTickInterval(tickSpeed);
    this.store.dispatch(TickerActions.setTickInterval({ newTickInterval }));
  }

  handleRandomLifeToggle(randomLifeEnabled: boolean): void {
    if (randomLifeEnabled) {
      this.store.dispatch(GameBoardActions.activateRandomLife());
    } else {
      this.store.dispatch(GameBoardActions.disableRandomLife());
    }
  }
}
