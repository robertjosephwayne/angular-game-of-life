import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppState, mockState } from 'src/app/store/app.state';

import * as GameBoardActions from '../../../store/game-board/game-board.actions';
import * as TickerActions from '../../../store/ticker/ticker.actions';

import { GameButtonsComponent } from './game-buttons.component';

describe('GameButtonsComponent', () => {
  let component: GameButtonsComponent;
  let fixture: ComponentFixture<GameButtonsComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameButtonsComponent
      ],
      providers: [
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, "dispatch");
    fixture = TestBed.createComponent(GameButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the manualTick action when next button is clicked', () => {
    const nextButton = fixture.debugElement.query(By.css('#next'));
    nextButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.manualTick());
  });

  it('should dispatch the startTicking action when the start button is clicked', () => {
    const startButton = fixture.debugElement.query(By.css('#start'));
    startButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.startTicking());
  });

  it('should dispatch the pause action when the stop button is clicked', () => {
    const testActiveTicker = setInterval(() => {
      return;
    }, 10000);

    store.setState(
      mockState({
        ticker: {
          maxTickInterval: 1000,
          tickSpeed: 500,
          activeTicker: testActiveTicker
        }
      })
    );
    fixture.detectChanges();

    const stopButton = fixture.debugElement.query(By.css('#stop'));
    stopButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.pause());
  });

  it('should dispatch the reset action when the reset button is clicked', () => {
    const resetButton = fixture.debugElement.query(By.css('#reset'));
    resetButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.reset());
  });

  it('should dispatch the zoomIn action when the zoom in button is clicked', () => {
    const zoomInButton = fixture.debugElement.query(By.css('#zoom-in'));
    zoomInButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.zoomIn());
  });

  it('should dispatch the zoomOut action when the zoom out button is clicked', () => {
    const zoomOutButton = fixture.debugElement.query(By.css('#zoom-out'));
    zoomOutButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.zoomOut());
  });
});
