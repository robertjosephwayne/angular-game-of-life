import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as fromGameBoard from '../../../store/game-board/game-board.selectors';

import * as GameBoardActions from '../../../store/game-board/game-board.actions';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css']
})
export class GameGridComponent implements OnInit {
  currentGeneration$: Observable<number[][]>;

  constructor(private store: Store<fromApp.AppState>) { }

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
