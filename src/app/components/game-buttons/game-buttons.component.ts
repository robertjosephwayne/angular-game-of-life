import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../../store/game-board/game-board.actions';
import * as TickerActions from '../../store/ticker/ticker.actions';
import * as PatternsActions from '../../store/patterns/patterns.actions';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.css']
})
export class GameButtonsComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  tickerSub: Subscription;
  currentGeneration: number[][];
  generationCount: number;
  minGridSize: number;
  maxGridSize: number;
  activeTicker: any;
  randomLifeActive: boolean;
  liveCells: number;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
    this.setTickerData();
  }

  setGameBoardData(): void {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.currentGeneration = state.currentGeneration;
      this.generationCount = state.generationCount;
      this.liveCells = state.liveCells;
      this.minGridSize = state.minGridSize;
      this.maxGridSize = state.maxGridSize;
      this.randomLifeActive = state.randomLifeActive;
    });
  }

  setTickerData(): void {
    this.tickerSub = this.store.select('ticker').subscribe(state => {
      this.activeTicker = state.activeTicker;
    });
  }

  tick(): void {
    this.store.dispatch(TickerActions.manualTick());
  }

  reset(): void {
    this.store.dispatch(GameBoardActions.reset());
  }

  startTicking(): void {
    this.store.dispatch(TickerActions.startTicking());
  }

  stopTicking(): void {
    this.store.dispatch(TickerActions.pause());
  }

  zoomIn(): void {
    this.store.dispatch(GameBoardActions.zoomIn());
  }

  zoomOut(): void {
    this.store.dispatch(GameBoardActions.zoomOut());
  }

  get canTick(): boolean {
    return (this.liveCells || this.randomLifeActive) && !this.activeTicker;
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

  get gridSize(): number {
    return this.currentGeneration.length;
  }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
    this.tickerSub.unsubscribe();
  }
}
