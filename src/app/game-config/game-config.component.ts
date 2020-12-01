import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../game-board/store/game-board.actions';
import * as fromApp from '../store/app.reducer';

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
  generationCount: number;
  liveCells: number;
  randomLifeActive: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData(): void {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.autoTicking = state.autoTicking;
      this.tickInterval = state.tickInterval;
      this.maxTickInterval = state.maxTickInterval;
      this.generationCount = state.generationCount;
      this.liveCells = state.liveCells;
      this.randomLifeActive = state.randomLifeActive;
    });
  }

  handleGridResize(gridSize: number): void {
    this.store.dispatch(GameBoardActions.setGridSize({ gridSize }));
  }

  handleSpeedChange(tickSpeed: number): void {
    const newTickInterval = this.getTickInterval(tickSpeed);
    this.store.dispatch(GameBoardActions.setTickInterval({ newTickInterval }));
    if (this.autoTicking) this.store.dispatch(GameBoardActions.startTicking());
  }

  handleRandomLifeToggle(randomLifeEnabled: boolean): void {
    if (randomLifeEnabled) {
      this.store.dispatch(GameBoardActions.activateRandomLife());
    } else {
      this.store.dispatch(GameBoardActions.disableRandomLife());
    }
  }

  getTickInterval(tickSpeed: number): number {
    return this.maxTickInterval - tickSpeed;
  }

  get tickSpeed(): number {
    return this.maxTickInterval - this.tickInterval;
  }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
  }
}
