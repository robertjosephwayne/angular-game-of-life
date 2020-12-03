import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../game-board/store/game-board.actions';
import * as GameConfigActions from '../game-config/store/game-config.actions';
import * as GameStatsActions from '../game-config/game-stats/store/game-stats.actions';
import * as PatternsActions from '../game-config/patterns/store/patterns.actions';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.css']
})
export class GameButtonsComponent implements OnInit, OnDestroy {
  gameConfigSub: Subscription;
  gameStatsSub: Subscription;
  generationCount: number;
  minGridSize: number;
  maxGridSize: number;
  gridSize: number;
  autoTicking: boolean;
  randomLifeActive: boolean;
  liveCells: number;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameConfigData();
    this.setGameStatsData();
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

  setGameStatsData(): void {
    this.gameStatsSub = this.store.select('gameStats').subscribe(state => {
      this.liveCells = state.liveCells;
      this.generationCount = state.generationCount;
    });
  }

  tick(): void {
    this.store.dispatch(GameBoardActions.tick());
  }

  reset(): void {
    this.stopTicking();
    this.store.dispatch(PatternsActions.resetSelectedPattern());
    this.store.dispatch(GameConfigActions.resetTickInterval());
    this.store.dispatch(GameStatsActions.resetGenerationCount());
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
    this.gameConfigSub.unsubscribe();
    this.gameStatsSub.unsubscribe();
  }

}
