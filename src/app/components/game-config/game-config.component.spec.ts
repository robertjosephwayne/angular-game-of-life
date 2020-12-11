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

import * as GameBoardActions from '../../store/game-board/game-board.actions';
import * as TickerActions from '../../store/ticker/ticker.actions';

import { GameConfigComponent } from './game-config.component';

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

  it('should dispatch the setTickSpeed action when the tick speed changes', async () => {
    const sliderHarness = await loader.getHarness(MatSliderHarness);
    await sliderHarness.setValue(0);
    expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.setTickSpeed({ newTickSpeed: 0 }));
  });

  it('should dispatch the activateRandomLife action when the random life box is checked', async () => {
    const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
    await checkboxHarness.check();
    expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.activateRandomLife());
  });

  it('should dispatch the disableRandomLife action when the random life box is unchecked', async () => {
    store.setState(
      mockState({
        gameBoard: {
          currentGeneration: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
          ],
          randomLifeActive: true,
          generationCount: 0,
          minGridSize: 3,
          maxGridSize: 25
        }
      })
    );
    const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
    await checkboxHarness.uncheck();
    expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.disableRandomLife());
  });

  describe('setGameBoardData function', () => {

  });

  describe('setTickerData function', () => {

  });
