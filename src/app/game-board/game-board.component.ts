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
  minGridSize: number;
  maxGridSize: number;
  gridSize: number;
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
      this.minGridSize = state.minGridSize;
      this.maxGridSize = state.maxGridSize;
      this.gridSize = state.gridSize;
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
    this.store.dispatch(GameBoardActions.startTicking());
  }

  stopTicking() {
    this.store.dispatch(GameBoardActions.stopTicking());
  }

  zoomIn() {
    this.store.dispatch(GameBoardActions.zoomIn());
  }

  zoomOut() {
    this.store.dispatch(GameBoardActions.zoomOut());
  }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
  }
}
