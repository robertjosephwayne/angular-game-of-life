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

  it('should display the label', () => {
    const patternsElement: HTMLElement = fixture.nativeElement;
    const patternsLabel = patternsElement.querySelector('mat-label');
    expect(patternsLabel.textContent).toEqual('Preset Patterns');
  });

  it('should include an option for each preset pattern', () => {
    const patternsElement: HTMLElement = fixture.nativeElement;
    const options = patternsElement.querySelectorAll('mat-option');
    expect(options.length).toEqual(9);
  });
  describe('handlePatternSelect function', () => {
    it('should dispatch the setSelectedPattern action with the correct argument', async () => {
      const patternName = 'Test Pattern Name';
      component.handlePatternSelect(patternName);
      expect(dispatchSpy).toHaveBeenCalledWith(PatternsActions.setSelectedPattern({ patternName }));
    });
  });
