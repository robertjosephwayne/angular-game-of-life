import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as GameBoardActions from '../../store/game-board/game-board.actions';
import * as TickerActions from '../../store/ticker/ticker.actions';

import * as fromApp from '../../store/app.reducer';
import * as fromGameBoard from '../../store/game-board/game-board.selectors';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.css']
})
export class GameButtonsComponent implements OnInit, OnDestroy {
  gameBoardSub: Subscription;
  tickerSub: Subscription;
  currentGeneration: number[][];
  minGridSize: number;
  maxGridSize: number;
  activeTicker: any;
  randomLifeActive: boolean;
  canReset$: Observable<boolean>;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setGameBoardData();
    this.setTickerData();
  }

  setGameBoardData(): void {
    this.canGenerateNextGeneration$ = this.store.select(fromGameBoard.canGenerateNextGeneration);
    this.canZoomIn$ = this.store.select(fromGameBoard.canZoomIn);
    this.canZoomOut$ = this.store.select(fromGameBoard.canZoomOut);
    this.canReset$ = this.store.select(fromGameBoard.canReset);
  }

  setTickerData(): void {
    this.isTickerActive$ = this.store.select(fromTicker.isTickerActive);
  }

  tick(): void {
    this.store.dispatch(TickerActions.manualTick());
  }

  startTicking(): void {
    this.store.dispatch(TickerActions.startTicking());
  }

  stopTicking(): void {
    this.store.dispatch(TickerActions.pause());
  }

  reset(): void {
    this.store.dispatch(GameBoardActions.reset());
  }

  zoomIn(): void {
    this.store.dispatch(GameBoardActions.zoomIn());
  }

  zoomOut(): void {
    this.store.dispatch(GameBoardActions.zoomOut());
  }
}
