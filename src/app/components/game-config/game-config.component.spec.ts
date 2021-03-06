import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';

import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppState, mockState } from 'src/app/store/app.state';
import { GameBoardState } from '../../store/game-board/game-board.state';

import * as fromGameBoard from '../../store/game-board/game-board.selectors';
import * as fromTicker from '../../store/ticker/ticker.selectors';

import * as GameBoardActions from '../../store/game-board/game-board.actions';
import * as TickerActions from '../../store/ticker/ticker.actions';

import { GameConfigComponent } from './game-config.component';
import { of } from 'rxjs';

describe('GameConfigComponent', () => {
  let component: GameConfigComponent;
  let fixture: ComponentFixture<GameConfigComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jasmine.Spy;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameConfigComponent
      ],
      imports: [
        MatCheckboxModule,
        MatSliderModule
      ],
      providers: [
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, "dispatch");
    fixture = TestBed.createComponent(GameConfigComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the newTickSpeed function with the correct tick speed when the tick speed changes', async () => {
    const handleSpeedChangeSpy = spyOn(component, 'handleSpeedChange');
    const sliderHarness = await loader.getHarness(MatSliderHarness);
    const newTickSpeed = 1000;
    await sliderHarness.setValue(newTickSpeed);
    expect(handleSpeedChangeSpy).toHaveBeenCalledWith(newTickSpeed);
  });

  it('should call the handleRandomLifeToggle function with the correct argument when checked', async () => {
    component.randomLifeActive$ = of(false);
    fixture.detectChanges();
    const handleRandomLifeToggleSpy = spyOn(component, 'handleRandomLifeToggle');
    const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
    await checkboxHarness.check();
    expect(handleRandomLifeToggleSpy).toHaveBeenCalledWith(true);
  });

  it('should call the handleRandomLifeToggle function with the correct argument when unchecked', async () => {
    component.randomLifeActive$ = of(true);
    fixture.detectChanges();
    const handleRandomLifeToggleSpy = spyOn(component, 'handleRandomLifeToggle');
    const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
    await checkboxHarness.uncheck();
    expect(handleRandomLifeToggleSpy).toHaveBeenCalledWith(false);
  });

  describe('ngOnInit', () => {
    it('should initialize data from the game board state', () => {
      const setGameBoardDataSpy = spyOn(component, 'setGameBoardData');
      component.ngOnInit();
      expect(setGameBoardDataSpy).toHaveBeenCalledTimes(1);
    });

    it('should initialize data from the ticker state', () => {
      const setTickerDataSpy = spyOn(component, 'setTickerData');
      component.ngOnInit();
      expect(setTickerDataSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setGameBoardData function', () => {
    it('should correctly set the randomLifeActive$ property', async (done) => {
      const testSelector = fromGameBoard.isRandomLifeActive;
      const testSelectorResult = true;
      store.overrideSelector(testSelector, testSelectorResult);
      component.randomLifeActive$.subscribe(result => {
        expect(result).toEqual(testSelectorResult);
        done();
      });
    });
  });

  describe('setTickerData function', () => {
    it('should correctly set the maxTickInterval$ property', async (done) => {
      const testSelector = fromTicker.selectMaxTickInterval;
      const testSelectorResult = 2000;
      store.overrideSelector(testSelector, testSelectorResult);
      component.maxTickInterval$.subscribe(result => {
        expect(result).toEqual(testSelectorResult);
        done();
      });
    });

    it('should correctly set the tickSpeed$ property', async (done) => {
      const testSelector = fromTicker.selectTickSpeed;
      const testSelectorResult = 25;
      store.overrideSelector(testSelector, testSelectorResult);
      component.tickSpeed$.subscribe(result => {
        expect(result).toEqual(testSelectorResult);
        done();
      });
    });
  });

  describe('handleSpeedChange function', () => {
    it('should dispatch the setTickSpeed action with the correct tick speed', () => {
      const newTickSpeed = 50;
      component.handleSpeedChange(newTickSpeed);
      expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.setTickSpeed({ newTickSpeed }));
    });
  });

  describe('handleRandomLifeToggle function', () => {
    it('should dispatch the activateRandomLife action when random life is enabled', async () => {
      const randomLifeEnabled = true;
      component.handleRandomLifeToggle(randomLifeEnabled);
      expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.activateRandomLife());
    });

    it('should dispatch the disableRandomLife action when random life is disabled', async () => {
      const randomLifeEnabled = false;
      component.handleRandomLifeToggle(randomLifeEnabled);
      expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.disableRandomLife());
    });
  });
});
