import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as PatternsActions from '../../../store/patterns/patterns.actions';

import * as fromApp from '../../../store/app.reducer';
import * as fromPatterns from '../../../store/patterns/patterns.selectors';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.css']
})
export class PatternsComponent implements OnInit {
  presetPatterns$: Observable<string[]>;
  selectedPattern$: Observable<string>;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setPatternsData();
  }

  setPatternsData(): void {
    this.presetPatterns$ = this.store.select(fromPatterns.selectPresetPatterns);
    this.selectedPattern$ = this.store.select(fromPatterns.selectedPattern);
  }

  handlePatternSelect(patternName: string): void {
    this.store.dispatch(PatternsActions.setSelectedPattern({ patternName }));
  }
}
