import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from './store/game-board.actions';
import * as fromApp from '../store/app.reducer';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  currentGeneration: number[][];
  gameBoardSub: Subscription;
  liveCells: number;
  randomLifeActive: boolean;
  autoTicking: boolean;
  tickInterval: number;
  ticker: any;
  gridSize: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  generationCount: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData() {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.currentGeneration = state.currentGeneration;
      this.liveCells = state.liveCells;
      this.randomLifeActive = state.randomLifeActive;
      this.autoTicking = state.autoTicking;
      this.tickInterval = state.tickInterval;
      this.ticker = state.ticker;
      this.gridSize = state.gridSize;
      this.canZoomIn = state.canZoomIn;
      this.canZoomOut = state.canZoomOut;
      this.generationCount = state.generationCount;
    });
  }

  handleCellClick(rowIndex, columnIndex) {
    this.store.dispatch(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
  }

  tick() {
    if (this.liveCells === 0 && !this.randomLifeActive) return;
    this.store.dispatch(GameBoardActions.tick());
  }

  reset() {
    this.stopTicking();
    this.store.dispatch(GameBoardActions.resetGridSize());
    this.store.dispatch(GameBoardActions.resetGeneration());
    this.store.dispatch(GameBoardActions.resetTickInterval());
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
    this.store.dispatch(GameBoardActions.startTicking());
    this.store.dispatch(GameBoardActions.setTicker({ newTicker: ticker }))
  }

  stopTicking() {
    this.store.dispatch(GameBoardActions.stopTicking());
  }

  zoomIn() {
    this.store.dispatch(GameBoardActions.setGridSize({
      gridSize: this.gridSize - 1
    }));
  }

  zoomOut() {
    this.store.dispatch(GameBoardActions.setGridSize({
      gridSize: this.gridSize + 1
    }));
  }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
  }
}
