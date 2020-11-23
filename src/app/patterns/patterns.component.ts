import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as GameBoardActions from '../game-board/store/game-board.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.css']
})
export class PatternsComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  handlePatternSelect(event) {
    const patternName = event.target.value;
    this.store.dispatch(GameBoardActions.selectPattern({ patternName }));
  }
}
