import { Action } from '@ngrx/store';
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable, of } from 'rxjs';

import * as GameBoardActions from '../game-board/game-board.actions';
import * as TickerActions from '../ticker/ticker.actions';

import { TickerEffects } from './ticker.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, mockState } from '../app.state';
import { TickerService } from 'src/app/services/ticker.service';

describe('Ticker Effects', () => {
  let actions$: Observable<Action>;
  let effects: TickerEffects;
  let store: MockStore<AppState>;
  let tickerService: TickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TickerEffects,
        TickerService,
        provideMockActions(() => actions$),
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    });

    tickerService = TestBed.inject(TickerService);
    store = TestBed.inject(MockStore);
    effects = TestBed.inject(TickerEffects);
  });

  describe('resetTickSpeed$', () => {
    it('should dispatch the resetTickSpeed action when the reset action is dispatched', () => {
      actions$ = of(GameBoardActions.reset());
      effects.resetTickSpeed$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.resetTickSpeed()
        );
      });
    });
  });

  describe('setTickSpeed$', () => {
    it('should dispatch the updateActiveTickInterval action when the setTickSpeed action is dispatched if an active ticker exists', () => {
      const maxTickInterval = 1000;
      const currentTickSpeed = 400;
      const newTickSpeed = 600;
      const activeTicker = setInterval(() => {
        return;
      }, 1000);

      store.setState(mockState({
        ticker: {
          maxTickInterval,
          tickSpeed: currentTickSpeed,
          activeTicker
        }
      }));

      actions$ = of(TickerActions.setTickSpeed({ newTickSpeed }));
      effects.setTickSpeed$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.updateActiveTickInterval()
        );
      });
    });
  });

    it('should dispatch an empty action when the setTickSpeed action is dispatched if no active ticker exists', () => {

    });
  });

  describe('startTicking$', () => {
    it('should clear the interval of the active ticker when the startTicking action is dispatched', () => {

    });

    it('should create a new ticker using the current tick interval when the startTicking action is dispatched', () => {

    });

    it('should dispatch the setTicker action when the startTicking action is dispatched', () => {

    });

    it('should clear the interval of the active ticker when the updateActiveTickInterval action is dispatched', () => {

    });

    it('should create a new ticker using the current tick interval when the updateActiveTickInterval action is dispatched', () => {

    });

    it('should dispatch the setTicker action when the updateActiveTickInterval action is dispatched', () => {

    });
  });

  describe('autoTick$', () => {
    it('should dispatch the stopTicking action when the autoTick action is dispatched if there are no live cells and random life is not active', () => {

    });

    it('should dispatch the tick action when the autoTick action is dispatched if there are no live cells and random life is active', () => {

    });

    it('should dispatch the tick action when the autoTick action is dispatched if there are live cells and random life is not active', () => {

    });
  });

  describe('stopTicking$', () => {
    it('should dispatch the stopTicking action when the setCurrentGeneration action is dispatched', () => {
      actions$ = of(GameBoardActions.setCurrentGeneration);
      effects.stopTicking$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.stopTicking()
        );
      });
    });

    it('should dispatch the stopTicking action when the pause action is dispatched', () => {
      actions$ = of(TickerActions.pause);
      effects.stopTicking$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.stopTicking()
        );
      });
    });
  });

  describe('clearTickInterval$', () => {
    it('should dispatch the clearTicker action when the stopTicking action is dispatched', () => {
      actions$ = of(TickerActions.stopTicking());
      effects.clearTickInterval$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.clearTicker()
        );
      });
    });

    it('should clear the interval of the active ticker when the stopTicking action is dispatched', () => {

    });
  });

  describe('manualTick$', () => {
    it('should dispatch the tick action when the manualTick action is dispatched', () => {
      actions$ = of(TickerActions.manualTick());
      effects.manualTick$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.tick()
        );
      });
    });
  });
});
