import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../../store/app.state';

import * as GameBoardActions from '../../../store/game-board/game-board.actions';
import * as TickerActions from '../../../store/ticker/ticker.actions';

import * as fromGameBoard from '../../../store/game-board/game-board.selectors';
import * as fromTicker from '../../../store/ticker/ticker.selectors'

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.css']
})
export class GameButtonsComponent implements OnInit {
  isTickerActive$: Observable<boolean>;
  canReset$: Observable<boolean>;
  canGenerateNextGeneration$: Observable<boolean>;
  canZoomIn$: Observable<boolean>;
  canZoomOut$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
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
