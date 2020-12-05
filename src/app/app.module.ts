import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';

import * as fromGameBoard from './game-board/store/game-board.reducer';
import * as fromGameConfig from './game-config/store/game-config.reducer';
import * as fromGameStats from './game-config/game-stats/store/game-stats.reducer';
import * as fromPatterns from './game-config/patterns/store/patterns.reducer';

import { GameBoardEffects } from './game-board/store/game-board.effects';
import { GameConfigEffects } from './game-config/store/game-config.effects';
import { GameStatsEffects } from './game-config/game-stats/store/game-stats.effects';
import { PatternsEffects } from './game-config/patterns/store/patterns.effects';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameButtonsComponent } from './game-buttons/game-buttons.component';
import { GameConfigComponent } from './game-config/game-config.component';
import { GameCounterComponent } from './game-config//game-stats/game-counter/game-counter.component';
import { GameHeaderComponent } from './game-header/game-header.component';
import { GameStatsComponent } from './game-config/game-stats/game-stats.component';
import { PatternsComponent } from './game-config/patterns/patterns.component';

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
