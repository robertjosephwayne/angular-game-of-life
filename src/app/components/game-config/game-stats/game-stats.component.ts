import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../store/app.state';

import * as fromGameBoard from '../../../store/game-board/game-board.selectors';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnInit {
  generationCount$: Observable<number>;
  liveCellCount$: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
  }

  setGameBoardData(): void {
    this.generationCount$ = this.store.select(fromGameBoard.selectGenerationCount);
    this.liveCellCount$ = this.store.select(fromGameBoard.selectLiveCellCount);
  }
}
