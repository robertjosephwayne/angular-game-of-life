import { Action } from '@ngrx/store';
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable, of } from 'rxjs';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as PatternsActions from '../patterns/patterns.actions';
import * as TickerActions from '../ticker/ticker.actions';

import { TickerEffects } from './ticker.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState, mockState } from '../app.state';

describe('Ticker Effects', () => {
  let actions$: Observable<Action>;
  let effects: TickerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TickerEffects,
        provideMockActions(() => actions$),
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    });
    effects = TestBed.inject(TickerEffects);
  });

  describe('resetTickSpeed$', () => {
    it('should dispatch the resetTickSpeed action', () => {
      actions$ = of(GameBoardActions.reset());
      effects.resetTickSpeed$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.resetTickSpeed()
        );
      });
    });
  });

  describe('setTickSpeed$', () => {
    it('should dispatch the updateActiveTickInterval action if an active ticker exists', () => {

    });

    it('should dispatch an empty action if no active ticker exists', () => {

    });
  });

  describe('startTicking$', () => {
    it('should clear the interval of the active ticker', () => {

    });

    it('should create a new ticker using the current tick interval', () => {

    });

    it('should dispatch the setTicker action', () => {

    });
  });

  describe('autoTick$', () => {
    it('should dispatch the stopTicking action if there are no live cells and random life is not active', () => {

    });

    it('should dispatch the tick action if there are no live cells and random life is active', () => {

    });

    it('should dispatch the tick action if there are live cells and random life is not active', () => {

    });
  });

  describe('stopTicking$', () => {
    it('should dispatch the stopTicking action', () => {

    });
  });

  describe('clearTickInterval$', () => {
    it('should dispatch the clearTicker action', () => {
      actions$ = of(TickerActions.stopTicking());
      effects.clearTickInterval$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.clearTicker()
        );
      });
    });

    it('should clear the interval of the active ticker', () => {

    });
  });

  describe('manualTick$', () => {
    it('should dispatch the tick action', () => {
      actions$ = of(TickerActions.manualTick());
      effects.manualTick$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.tick()
        );
      });
    });
  });
});
