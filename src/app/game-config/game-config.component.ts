import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../game-board/store/game-board.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit {
  subscription: Subscription;
  autoTicking: boolean;
  tickInterval: number;
  maxTickInterval: number;
  tickSpeed: number;
  ticker: any;
  gridSize: number;
  minGridSize: number;
  maxGridSize: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('gameBoard').subscribe(state => {
      this.autoTicking = state.autoTicking;
      this.tickInterval = state.tickInterval;
      this.maxTickInterval = state.maxTickInterval;
      this.ticker = state.ticker;
      this.gridSize = state.gridSize;
      this.minGridSize = state.minGridSize;
      this.maxGridSize = state.maxGridSize;
    });
  }

  tick() {
    this.store.dispatch(GameBoardActions.tick());
  }

  reset() {
    this.store.dispatch(GameBoardActions.reset());
  }

  startTicking() {
    if (this.autoTicking) this.stopTicking();
    const ticker = setInterval(() => {
      this.store.dispatch(GameBoardActions.tick());
    }, this.tickInterval);
    this.store.dispatch(GameBoardActions.startTicking({ newTicker: ticker }));
  }

  stopTicking() {
    clearInterval(this.ticker);
    this.store.dispatch(GameBoardActions.stopTicking());
  }

  handleGridResize(event) {
    const gridSize = event.target.value;
    this.store.dispatch(GameBoardActions.setGridSize({ gridSize }));
  }

  handleSpeedChange(event) {
    const tickSpeed = event.target.value;
    const newTickInterval = this.getTickInterval(tickSpeed);
    this.store.dispatch(GameBoardActions.setTickInterval({ newTickInterval }));
    if (this.autoTicking) this.startTicking();
  }

  getTickInterval(tickSpeed) {
    return this.maxTickInterval - tickSpeed * 10;
  }
}