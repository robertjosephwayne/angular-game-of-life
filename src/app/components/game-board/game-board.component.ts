import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as GameBoardActions from '../../store/game-board/game-board.actions';

import * as fromApp from '../../store/app.reducer';
import * as fromGameBoard from '../../store/game-board/game-board.selectors';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  currentGeneration$: Observable<number[][]>;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData(): void {
    this.currentGeneration$ = this.store.select(fromGameBoard.selectCurrentGeneration);
  }

  handleCellClick(rowIndex: number, columnIndex: number): void {
    this.store.dispatch(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
  }
}
