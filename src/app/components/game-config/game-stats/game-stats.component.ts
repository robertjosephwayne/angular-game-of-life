import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  generationCount: number;
  liveCells: number;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData(): void {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.generationCount = state.generationCount;
      this.liveCells = state.liveCells;
    });
  }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
  }
}
