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

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('gameBoard').subscribe(state => {
      this.currentGeneration = state.currentGeneration;
    });
  }

  handleCellClick(rowIndex, columnIndex) {
    this.store.dispatch(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
