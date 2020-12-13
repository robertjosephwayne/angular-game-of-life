import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';

import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppState, mockState } from 'src/app/store/app.state';

import * as fromPatterns from '../../../store/patterns/patterns.selectors';

import * as PatternsActions from '../../../store/patterns/patterns.actions';

import { PatternsComponent } from './patterns.component';
import { of } from 'rxjs';

describe('PatternsComponent', () => {
  let component: PatternsComponent;
  let fixture: ComponentFixture<PatternsComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jasmine.Spy;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PatternsComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      providers: [
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, "dispatch");
    fixture = TestBed.createComponent(PatternsComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', async () => {
    const formFieldHarness = await loader.getHarness(MatFormFieldHarness);
    const patternLabel = await formFieldHarness.getLabel();
    expect(patternLabel).toEqual('Preset Patterns');
  });

  it('should include an option for each preset pattern', async () => {
    component.presetPatterns$ = of([
      'Preset Pattern 1',
      'Preset Pattern 2',
      'Preset Pattern 3',
    ]);
    fixture.detectChanges();

    const selectHarness = await loader.getHarness(MatSelectHarness);
    await selectHarness.open();
    const options = await selectHarness.getOptions();

    expect(options.length).toEqual(3);
  });

  it('should call the handlePatternSelect function when a pattern is selected', async () => {
    const handlePatternSelectSpy = spyOn(component, 'handlePatternSelect');
    const patternName = 'Glider';

    const selectHarness = await loader.getHarness(MatSelectHarness);
    await selectHarness.open();
    await selectHarness.clickOptions({ text: patternName });

    expect(handlePatternSelectSpy).toHaveBeenCalledWith(patternName);
  });

  describe('setPatternsData function', () => {

  });

  describe('handlePatternSelect function', () => {
    it('should dispatch the setSelectedPattern action with the correct argument', async () => {
      const patternName = 'Test Pattern Name';
      component.handlePatternSelect(patternName);
      expect(dispatchSpy).toHaveBeenCalledWith(PatternsActions.setSelectedPattern({ patternName }));
    });
  });
});
