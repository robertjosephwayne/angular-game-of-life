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
  ticker = null;
  currentlyTicking = false;
  tickInterval = 500;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('gameBoard').subscribe(state => {
      this.currentGeneration = state.currentGeneration;
    });
  }

  tick() {
    this.store.dispatch(GameBoardActions.tick());
  }

  reset() {
    this.store.dispatch(GameBoardActions.reset());
  }

  handleCellClick(rowIndex, columnIndex) {
    this.store.dispatch(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
  }

  handleGridResize(event) {
    this.setGridSize(event.target.value);
  }

  setGridSize(gridSize) {
    this.store.dispatch(GameBoardActions.setGridSize({ gridSize }));
  }

  startTicking() {
    if (this.currentlyTicking) this.stopTicking();
    this.ticker = setInterval(() => {
      this.store.dispatch(GameBoardActions.tick());
    }, this.tickInterval);
    this.currentlyTicking = true;
  }

  stopTicking() {
    clearInterval(this.ticker);
    this.ticker = null;
    this.currentlyTicking = false;
  }

  handleSpeedChange(event) {
    const rangeValue = event.target.value;
    const rangeMax = event.target.getAttribute('max');
    const newTickInterval = rangeMax - rangeValue;
    this.tickInterval = newTickInterval;
    if (this.currentlyTicking) this.startTicking();
  }

  handlePatternSelect(event) {
    const patternName = event.target.value;
    this.store.dispatch(GameBoardActions.selectPattern({ patternName }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
