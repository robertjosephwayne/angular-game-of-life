import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../../store/game-board/game-board.actions';
import * as GameConfigActions from '../../store/game-config/game-config.actions';
import * as PatternsActions from '../../store/patterns/patterns.actions';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.css']
})
export class GameButtonsComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  gameConfigSub: Subscription;
  currentGeneration: number[][];
  generationCount: number;
  minGridSize: number;
  maxGridSize: number;
  autoTicking: boolean;
  randomLifeActive: boolean;
  liveCells: number;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
    this.setGameConfigData();
  }

  setGameBoardData(): void {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.generationCount = state.generationCount;
      this.liveCells = state.liveCells;
    })
  }

  setGameConfigData(): void {
    this.gameConfigSub = this.store.select('gameConfig').subscribe(state => {
      this.autoTicking = state.autoTicking;
      this.randomLifeActive = state.randomLifeActive;
      this.gridSize = state.gridSize;
      this.minGridSize = state.minGridSize;
      this.maxGridSize = state.maxGridSize;
    });
  }

  tick(): void {
    this.store.dispatch(GameBoardActions.tick());
  }

  reset(): void {
    this.stopTicking();
    this.store.dispatch(PatternsActions.resetSelectedPattern());
    this.store.dispatch(GameConfigActions.resetTickInterval());
  }

  startTicking(): void {
    this.store.dispatch(GameConfigActions.startTicking());
  }

  stopTicking(): void {
    this.store.dispatch(GameConfigActions.stopTicking());
  }

  zoomIn(): void {
    this.store.dispatch(GameConfigActions.zoomIn());
  }

  zoomOut(): void {
    this.store.dispatch(GameConfigActions.zoomOut());
  }

  get canTick(): boolean {
    return (this.liveCells || this.randomLifeActive) && !this.autoTicking;
  }

  get canZoomIn(): boolean {
    return this.gridSize > this.minGridSize;
  }

  get canZoomOut(): boolean {
    return this.gridSize < this.maxGridSize;
  }

  get canReset(): boolean {
    return this.generationCount > 0;
  }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
    this.gameConfigSub.unsubscribe();
  }

}
