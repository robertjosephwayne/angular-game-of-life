import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';

import { appReducer } from './store/app.reducer';

import { GameBoardEffects } from './store/game-board/game-board.effects';
import { TickerEffects } from './store/ticker/ticker.effects';
import { PatternsEffects } from './store/patterns/patterns.effects';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameButtonsComponent } from './components/game-board/game-buttons/game-buttons.component';
import { GameConfigComponent } from './components/game-config/game-config.component';
import { GameCounterComponent } from './components/game-config//game-stats/game-counter/game-counter.component';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { GameStatsComponent } from './components/game-config/game-stats/game-stats.component';
import { PatternsComponent } from './components/game-config/patterns/patterns.component';
import { GameGridComponent } from './components/game-board/game-grid/game-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameButtonsComponent,
    GameConfigComponent,
    GameCounterComponent,
    GameHeaderComponent,
    GameStatsComponent,
    PatternsComponent,
    GameGridComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production
    }),
    BrowserAnimationsModule,
    MaterialModule,
    EffectsModule.forRoot([
      GameBoardEffects,
      TickerEffects,
      PatternsEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
