import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.state';

import * as GameBoardActions from '../../store/game-board/game-board.actions';
import * as TickerActions from '../../store/ticker/ticker.actions';

import * as fromGameBoard from '../../store/game-board/game-board.selectors';
import * as fromTicker from '../../store/ticker/ticker.selectors';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css']
})
export class GameConfigComponent implements OnInit {
  tickSpeed$: Observable<number>;
  maxTickInterval$: Observable<number>;
  randomLifeActive$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
    this.setTickerData();
  }

  setGameBoardData(): void {
    this.randomLifeActive$ = this.store.select(fromGameBoard.isRandomLifeActive);
  }

  setTickerData(): void {
    this.maxTickInterval$ = this.store.select(fromTicker.selectMaxTickInterval);
    this.tickSpeed$ = this.store.select(fromTicker.selectTickSpeed);
  }

  handleSpeedChange(newTickSpeed: number): void {
    this.store.dispatch(TickerActions.setTickSpeed({ newTickSpeed }));
  }

  handleRandomLifeToggle(randomLifeEnabled: boolean): void {
    if (randomLifeEnabled) {
      this.store.dispatch(GameBoardActions.activateRandomLife());
    } else {
      this.store.dispatch(GameBoardActions.disableRandomLife());
    }
  }
}
