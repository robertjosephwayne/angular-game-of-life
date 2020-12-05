import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';

import * as fromGameBoard from './components/game-board/store/game-board.reducer';
import * as fromGameConfig from './components/game-config/store/game-config.reducer';
import * as fromGameStats from './components/game-config/game-stats/store/game-stats.reducer';
import * as fromPatterns from './components/game-config/patterns/store/patterns.reducer';

import { GameBoardEffects } from './components/game-board/store/game-board.effects';
import { GameConfigEffects } from './components/game-config/store/game-config.effects';
import { GameStatsEffects } from './components/game-config/game-stats/store/game-stats.effects';
import { PatternsEffects } from './components/game-config/patterns/store/patterns.effects';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameButtonsComponent } from './components/game-buttons/game-buttons.component';
import { GameConfigComponent } from './components/game-config/game-config.component';
import { GameCounterComponent } from './components/game-config//game-stats/game-counter/game-counter.component';
import { GameHeaderComponent } from './components/game-header/game-header.component';
import { GameStatsComponent } from './components/game-config/game-stats/game-stats.component';
import { PatternsComponent } from './components/game-config/patterns/patterns.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameButtonsComponent,
    GameConfigComponent,
    GameCounterComponent,
    GameHeaderComponent,
    GameStatsComponent,
    PatternsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      gameBoard: fromGameBoard.gameBoardReducer,
      gameConfig: fromGameConfig.gameConfigReducer,
      gameStats: fromGameStats.gameStatsReducer,
      patterns: fromPatterns.patternsReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production
    }),
    BrowserAnimationsModule,
    MaterialModule,
    EffectsModule.forRoot([
      GameBoardEffects,
      GameConfigEffects,
      GameStatsEffects,
      PatternsEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
