import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../game-board/store/game-board.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.css']
})
export class PatternsComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  gridSize: number;
  presetPatterns: { id: string, label: string }[];
  selectedPattern: string;
  ticker: any;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData() {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.gridSize = state.gridSize;
      this.selectedPattern = state.selectedPattern;
      this.presetPatterns = state.presetPatterns;
      this.ticker = state.ticker;
    });
  }

  handlePatternSelect(patternName) {
    this.stopTicking();
    this.store.dispatch(GameBoardActions.setSelectedPattern({ patternName }));
  }

  stopTicking() {
    clearInterval(this.ticker);
    this.store.dispatch(GameBoardActions.stopTicking());
  }

  ngOnDestroy() {
    this.gameBoardSub.unsubscribe();
  }
}
