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
