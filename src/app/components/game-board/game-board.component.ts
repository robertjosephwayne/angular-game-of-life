import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameBoardActions from '../../store/game-board/game-board.actions';

import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  currentGeneration: number[][];

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData(): void {
    this.gameBoardSub = this.store.select('gameBoard').subscribe(state => {
      this.currentGeneration = state.currentGeneration;
    });
  }

  handleCellClick(rowIndex: number, columnIndex: number): void {
    this.store.dispatch(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
  }

  ngOnDestroy(): void {
    this.gameBoardSub.unsubscribe();
  }
}
