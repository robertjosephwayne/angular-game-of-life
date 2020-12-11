import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { of } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';

import { AppState, mockState } from 'src/app/store/app.state';

import * as GameBoardActions from '../../../store/game-board/game-board.actions';
import * as TickerActions from '../../../store/ticker/ticker.actions';

import { GameButtonsComponent } from './game-buttons.component';

describe('GameButtonsComponent', () => {
  let component: GameButtonsComponent;
  let fixture: ComponentFixture<GameButtonsComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jasmine.Spy;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameButtonsComponent
      ],
      imports: [
        MatButtonModule,
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
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Next Button', () => {
    it('should not be disabled when canGenerateNextGeneration is true and isTicking is false', async () => {
      component.canGenerateNextGeneration$ = of(true);
      component.isTicking$ = of(false);
      fixture.detectChanges();
      const nextButton = await loader.getHarness(MatButtonHarness.with({ selector: '#next' }));
      expect(await nextButton.isDisabled()).toBeFalse();
    });

    it('should be disabled when canGenerateNextGeneration is false and isTicking is false', async () => {
      component.canGenerateNextGeneration$ = of(false);
      component.isTicking$ = of(true);
      fixture.detectChanges();
      const nextButton = await loader.getHarness(MatButtonHarness.with({ selector: '#next' }));
      expect(await nextButton.isDisabled()).toBeTrue();
    });

    it('should be disabled when isTicking is true', async () => {
      component.canGenerateNextGeneration$ = of(true);
      component.isTicking$ = of(true);
      fixture.detectChanges();
      const nextButton = await loader.getHarness(MatButtonHarness.with({ selector: '#next' }));
      expect(await nextButton.isDisabled()).toBeTrue();
    });

    it('should call the tick function when it is clicked', async () => {
      component.canGenerateNextGeneration$ = of(true);
      component.isTicking$ = of(false);
      fixture.detectChanges();

      const tickSpy = spyOn(component, 'tick');
      const nextButton = await loader.getHarness(MatButtonHarness.with({ selector: '#next' }));
      await nextButton.click();

      expect(tickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Start Button', () => {
    it('should not be rendered if isTicking is true', async () => {
      component.isTicking$ = of(true);
      fixture.detectChanges();
      const startButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '#start' }));
      expect(await startButtons.length).toEqual(0);
    });

    it('should be rendered if isTicking is false', async () => {
      component.isTicking$ = of(false);
      fixture.detectChanges();
      const startButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '#start' }));
      expect(await startButtons.length).toEqual(1);
    });

    it('should be disabled if canGenerateNextGeneration is false', async () => {
      component.canGenerateNextGeneration$ = of(false);
      fixture.detectChanges();
      const startButton = await loader.getHarness(MatButtonHarness.with({ selector: '#start' }));
      expect(await startButton.isDisabled()).toBeTrue();
    });

    it('should not be disabled if canGenerateNextGeneration is true', async () => {
      component.isTicking$ = of(false);
      component.canGenerateNextGeneration$ = of(true);
      fixture.detectChanges();
      const startButton = await loader.getHarness(MatButtonHarness.with({ selector: '#start' }));
      expect(await startButton.isDisabled()).toBeFalse();
    });

    it('should call the startTicking function when it is clicked', async () => {
      component.canGenerateNextGeneration$ = of(true);
      component.isTicking$ = of(false);
      fixture.detectChanges();

      const startTickingSpy = spyOn(component, 'startTicking');
      const startButton = await loader.getHarness(MatButtonHarness.with({ selector: '#start' }));
      await startButton.click();

      expect(startTickingSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Stop Button', () => {
    it('should not be rendered if isTicking is false', async () => {
      component.isTicking$ = of(false);
      fixture.detectChanges();
      const stopButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '#stop' }));
      expect(await stopButtons.length).toEqual(0);
    });

    it('should be rendered if isTicking is true', async () => {
      component.isTicking$ = of(true);
      fixture.detectChanges();
      const stopButtons = await loader.getAllHarnesses(MatButtonHarness.with({ selector: '#stop' }));
      expect(await stopButtons.length).toEqual(1);
    });

    it('should call the stopTicking function when it is clicked', async () => {
      component.isTicking$ = of(true);
      fixture.detectChanges();

      const stopTickingSpy = spyOn(component, 'stopTicking');
      const stopButton = await loader.getHarness(MatButtonHarness.with({ selector: '#stop' }));
      await stopButton.click();

      expect(stopTickingSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Reset Button', () => {
    it('should create', async () => {
      const resetButton = await loader.getHarness(MatButtonHarness.with({ selector: '#reset' }));
      expect(await resetButton).toBeDefined();
    });

    it('should be disabled if canReset is false', async () => {
      component.canReset$ = of(false);
      fixture.detectChanges();
      const resetButton = await loader.getHarness(MatButtonHarness.with({ selector: '#reset' }));
      expect(await resetButton.isDisabled()).toBeTrue();
    });

    it('should not be disabled if canReset is true', async () => {
      component.canReset$ = of(true);
      fixture.detectChanges();
      const resetButton = await loader.getHarness(MatButtonHarness.with({ selector: '#reset' }));
      expect(await resetButton.isDisabled()).toBeFalse();
    });

    it('should call the reset function when it is clicked', async () => {
      component.canReset$ = of(true);
      fixture.detectChanges();

      const resetSpy = spyOn(component, 'reset');
      const resetButton = await loader.getHarness(MatButtonHarness.with({ selector: '#reset' }));
      await resetButton.click();

      expect(resetSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Zoom In Button', () => {
    it('should create', async () => {
      const zoomInButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-in' }));
      expect(await zoomInButton).toBeDefined();
    });

    it('should be disabled if canZoomIn is false', async () => {
      component.canZoomIn$ = of(false);
      fixture.detectChanges();
      const zoomInButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-in' }));
      expect(await zoomInButton.isDisabled()).toBeTrue();
    });

    it('should not be disabled if canZoomIn is true', async () => {
      component.canZoomIn$ = of(true);
      fixture.detectChanges();
      const zoomInButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-in' }));
      expect(await zoomInButton.isDisabled()).toBeFalse();
    });

    it('should call the zoomIn function when it is clicked', async () => {
      component.canZoomIn$ = of(true);
      fixture.detectChanges();

      const zoomInSpy = spyOn(component, 'zoomIn');
      const zoomInButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-in' }));
      await zoomInButton.click();

      expect(zoomInSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Zoom Out Button', () => {
    it('should create', async () => {
      const zoomOutButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-out' }));
      expect(await zoomOutButton).toBeDefined();
    });

    it('should be disabled if canZoomOut is false', async () => {
      component.canZoomOut$ = of(false);
      fixture.detectChanges();
      const zoomOutButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-out' }));
      expect(await zoomOutButton.isDisabled()).toBeTrue();
    });

    it('should not be disabled if canZoomOut is true', async () => {
      component.canZoomOut$ = of(true);
      fixture.detectChanges();
      const zoomOutButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-out' }));
      expect(await zoomOutButton.isDisabled()).toBeFalse();
    });

    it('should call the zoomOut function when it is clicked', async () => {
      component.canZoomOut$ = of(true);
      fixture.detectChanges();

      const zoomOutSpy = spyOn(component, 'zoomOut');
      const zoomOutButton = await loader.getHarness(MatButtonHarness.with({ selector: '#zoom-out' }));
      await zoomOutButton.click();

      expect(zoomOutSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setGameBoardData function', () => {

  });

  describe('setTickerData function', () => {

  });

  describe('tick function', () => {
    it('should dispatch the manualTick action', () => {
      component.tick();
      expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.manualTick());
    });
  });

  describe('startTicking function', () => {
    it('should dispatch the startTicking action', () => {
      component.startTicking();
      expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.startTicking());
    });
  });

  describe('stopTicking function', () => {
    it('should dispatch the pause action', () => {
      component.stopTicking();
      expect(dispatchSpy).toHaveBeenCalledWith(TickerActions.pause());
    });
  });

  describe('reset function', () => {
    it('should dispatch the reset action', () => {
      component.reset();
      expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.reset());
    });
  });

  describe('zoomIn function', () => {
    it('should dispatch the zoomIn action', () => {
      component.zoomIn();
      expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.zoomIn());
    });
  });

  it('should dispatch the zoomOut action when the zoom out button is clicked', () => {
    const zoomOutButton = fixture.debugElement.query(By.css('#zoom-out'));
    zoomOutButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.zoomOut());
  });
});
