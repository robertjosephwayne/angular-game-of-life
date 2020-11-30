import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../game-board/store/game-board.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.css']
})
export class GameButtonsComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  liveCells: number;
  randomLifeActive: boolean;
  autoTicking: boolean;
  generationCount: number;
  gridSize: number;
  minGridSize: number;
  maxGridSize: number;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData() {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.liveCells = state.liveCells;
      this.randomLifeActive = state.randomLifeActive;
      this.autoTicking = state.autoTicking;
      this.generationCount = state.generationCount;
      this.gridSize = state.gridSize;
      this.minGridSize = state.minGridSize;
      this.maxGridSize = state.maxGridSize;
    });
  }

  tick() {
    this.store.dispatch(GameBoardActions.tick());
  }

  reset() {
    this.stopTicking();
    this.store.dispatch(GameBoardActions.resetGridSize());
    this.store.dispatch(GameBoardActions.resetGeneration());
    this.store.dispatch(GameBoardActions.resetTickInterval());
  }

  startTicking() {
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

  get canTick() {
    return (this.liveCells || this.randomLifeActive) && !this.autoTicking;
  }

  get canZoomIn() {
    return this.gridSize > this.minGridSize;
  }

  get canZoomOut() {
    return this.gridSize < this.maxGridSize;
  }

  get canReset() {
    return this.generationCount > 0;
  }

  ngOnDestroy() {
    this.gameBoardSub.unsubscribe();
  }

}
