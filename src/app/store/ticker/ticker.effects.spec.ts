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
    const maxTickInterval = 1000;
    const currentTickSpeed = 400;
    const newTickSpeed = 600;
    const activeTicker = null;

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
        { type: 'Empty Action ' }
      );
    });
  });

  describe('startTicking$', () => {
    it('should call replaceActiveAutoTicker from the ticker service when the startTicking action is dispatched if an active ticker exists', () => {
      const replaceActiveAutoTickerSpy = spyOn(tickerService, 'replaceActiveAutoTicker');
      const maxTickInterval = 1000;
      const tickSpeed = 400;
      const tickInterval = maxTickInterval - tickSpeed;
      const activeTicker = setInterval(() => {
        return;
      }, 1000);

      store.setState(mockState({
        ticker: {
          maxTickInterval,
          tickSpeed,
          activeTicker
        }
      }));

    it('should create a new ticker using the current tick interval when the startTicking action is dispatched', () => {

    it('should call createAutoTicker from the ticker service when the startTicking action is dispatched if no active ticker exists', () => {
      const createAutoTickerSpy = spyOn(tickerService, 'createAutoTicker');
      const maxTickInterval = 1000;
      const tickSpeed = 400;
      const tickInterval = maxTickInterval - tickSpeed;

      store.setState(mockState({
        ticker: {
          maxTickInterval,
          tickSpeed,
          activeTicker: null
        }
      }));

      actions$ = of(TickerActions.startTicking());
      effects.startTicking$.subscribe();
      expect(createAutoTickerSpy).toHaveBeenCalledWith(tickInterval);
    });
  });

  describe('updateActiveTickInterval$', () => {
    it('should call replaceActiveAutoTicker from the ticker service when the updateActiveTickInterval action is dispatched', () => {
      const replaceActiveAutoTickerSpy = spyOn(tickerService, 'replaceActiveAutoTicker');
      const maxTickInterval = 1000;
      const tickSpeed = 400;
      const tickInterval = maxTickInterval - tickSpeed;
      const activeTicker = setInterval(() => {
        return;
      }, 1000);

      store.setState(mockState({
        ticker: {
          maxTickInterval,
          tickSpeed,
          activeTicker
        }
      }));

      actions$ = of(TickerActions.updateActiveTickInterval());
      effects.updateActiveTickInterval$.subscribe();
      expect(replaceActiveAutoTickerSpy).toHaveBeenCalledWith(activeTicker, tickInterval);
    });
  });

  describe('autoTick$', () => {
    it('should dispatch the stopTicking action when the autoTick action is dispatched if there are no live cells and random life is not active', () => {
      store.setState(mockState({
        gameBoard: {
          currentGeneration: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
          randomLifeActive: false,
          generationCount: 0,
          minGridSize: 3,
          maxGridSize: 10
        }
      }));

      actions$ = of(TickerActions.autoTick());
      effects.autoTick$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.stopTicking()
        );
      });
    });

    it('should dispatch the tick action when the autoTick action is dispatched if there are no live cells and random life is active', () => {
      store.setState(mockState({
        gameBoard: {
          currentGeneration: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
          ],
          randomLifeActive: true,
          generationCount: 0,
          minGridSize: 3,
          maxGridSize: 10
        }
      }));

      actions$ = of(TickerActions.autoTick());
      effects.autoTick$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.tick()
        );
      });
    });

    it('should dispatch the tick action when the autoTick action is dispatched if there are live cells and random life is not active', () => {
      store.setState(mockState({
        gameBoard: {
          currentGeneration: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
          ],
          randomLifeActive: false,
          generationCount: 0,
          minGridSize: 3,
          maxGridSize: 10
        }
      }));

      actions$ = of(TickerActions.autoTick());
      effects.autoTick$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.tick()
        );
      });
    });
  });

  describe('setCurrentGeneration$', () => {
    it('should dispatch the stopTicking action when the setCurrentGeneration action is dispatched', () => {
      actions$ = of(GameBoardActions.setCurrentGeneration);
      effects.setCurrentGeneration$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.stopTicking()
        );
      });
    });
  });

  describe('pause$', () => {
    it('should dispatch the stopTicking action when the pause action is dispatched', () => {
      actions$ = of(TickerActions.pause);
      effects.pause$.subscribe((actions) => {
        expect(actions).toEqual(
          TickerActions.stopTicking()
        );
      });
    });
  })

  describe('clearTickInterval$', () => {
    it('should call clearAutoTicker from the ticker service when the stopTicking action is dispatched', () => {
      const clearAutoTickerSpy = spyOn(tickerService, 'clearAutoTicker');

      actions$ = of(TickerActions.stopTicking());
      effects.clearTickInterval$.subscribe();

      expect(clearAutoTickerSpy).toHaveBeenCalled();
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
