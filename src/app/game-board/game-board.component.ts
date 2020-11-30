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

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData() {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.currentGeneration = state.currentGeneration;
    });
  }

  handleCellClick(rowIndex, columnIndex) {
    this.store.dispatch(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
  }

  // tick() {
  //   this.store.dispatch(GameBoardActions.tick());
  // }

  // reset() {
  //   this.stopTicking();
  //   this.store.dispatch(GameBoardActions.resetGridSize());
  //   this.store.dispatch(GameBoardActions.resetGeneration());
  //   this.store.dispatch(GameBoardActions.resetTickInterval());
  // }

  // startTicking() {
  //   this.store.dispatch(GameBoardActions.startTicking());
  // }

  // stopTicking() {
  //   this.store.dispatch(GameBoardActions.stopTicking());
  // }

  // zoomIn() {
  //   this.store.dispatch(GameBoardActions.zoomIn());
  // }

  // zoomOut() {
  //   this.store.dispatch(GameBoardActions.zoomOut());
  // }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
  }
}
