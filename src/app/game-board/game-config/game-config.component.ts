import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../store/game-board.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  autoTicking: boolean;
  tickInterval: number;
  maxTickInterval: number;
  tickSpeed: number;
  ticker: any;
  gridSize: number;
  minGridSize: number;
  maxGridSize: number;
  generationCount: number;
  liveCells: number;
  randomLifeActive: boolean;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData() {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.autoTicking = state.autoTicking;
      this.tickInterval = state.tickInterval;
      this.maxTickInterval = state.maxTickInterval;
      this.ticker = state.ticker;
      this.gridSize = state.gridSize;
      this.minGridSize = state.minGridSize;
      this.maxGridSize = state.maxGridSize;
      this.generationCount = state.generationCount;
      this.liveCells = state.liveCells;
      this.randomLifeActive = state.randomLifeActive;
    });
  }

  tick() {
    if (this.liveCells === 0 && !this.randomLifeActive) return;
    this.store.dispatch(GameBoardActions.tick());
  }

  reset() {
    this.stopTicking();
    this.store.dispatch(GameBoardActions.reset());
  }

  startTicking() {
    if (this.liveCells === 0 && !this.randomLifeActive) return;
    if (this.autoTicking) this.stopTicking();
    const ticker = setInterval(() => {
      if ((this.liveCells === 0 && !this.randomLifeActive) || !this.autoTicking) {
        this.stopTicking();
      } else {
        this.store.dispatch(GameBoardActions.tick());
      }
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

  handleRandomLifeToggle(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.store.dispatch(GameBoardActions.activateRandomLife());
    } else {
      this.store.dispatch(GameBoardActions.disableRandomLife());
    }
  }

  getTickInterval(tickSpeed) {
    return this.maxTickInterval - tickSpeed * 10;
  }

  ngOnDestroy() {
    this.gameBoardSub.unsubscribe();
  }
}
