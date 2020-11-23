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
  subscription: Subscription;
  ticker: any;
  autoTicking: boolean;
  tickInterval: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('gameBoard').subscribe(state => {
      this.currentGeneration = state.currentGeneration;
      this.ticker = state.ticker;
      this.autoTicking = state.autoTicking;
      this.tickInterval = state.tickInterval;
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

  handleCellClick(rowIndex, columnIndex) {
    this.store.dispatch(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
  }

  handleGridResize(event) {
    const gridSize = event.target.value;
    this.store.dispatch(GameBoardActions.setGridSize({ gridSize }));
  }

  handleSpeedChange(event) {
    const rangeValue = event.target.value;
    const rangeMax = event.target.getAttribute('max');
    const newTickInterval = rangeMax - rangeValue;
    this.store.dispatch(GameBoardActions.setTickInterval({ newTickInterval }));
    if (this.autoTicking) this.startTicking();
  }

  handlePatternSelect(event) {
    const patternName = event.target.value;
    this.store.dispatch(GameBoardActions.selectPattern({ patternName }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
