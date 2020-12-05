import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as GameConfigActions from '../store/game-config.actions';
import * as PatternsActions from '../patterns/store/patterns.actions';

import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.css']
})
export class PatternsComponent implements OnInit, OnDestroy {
  patternsSub: Subscription;
  presetPatterns: string[];
  selectedPattern: string;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.setPatternsData();
  }

  setPatternsData(): void {
    this.patternsSub = this.store.select('patterns').subscribe(state => {
      this.selectedPattern = state.selectedPattern;
      this.presetPatterns = state.presetPatterns;
    });
  }

  handlePatternSelect(patternName: string): void {
    this.store.dispatch(GameConfigActions.stopTicking());
    this.store.dispatch(PatternsActions.setSelectedPattern({ patternName }));
  }

  ngOnDestroy(): void {
    this.patternsSub.unsubscribe();
  }
}
