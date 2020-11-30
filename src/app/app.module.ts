import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PatternsComponent } from './patterns/patterns.component';
import { GameConfigComponent } from './game-config/game-config.component';
import { GameCounterComponent } from './game-counter/game-counter.component';
import * as fromGameBoard from './game-board/store/game-board.reducer';
import { GameHeaderComponent } from './game-header/game-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { EffectsModule } from '@ngrx/effects';
import { GameBoardEffects } from './game-board/store/game-board.effects';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    PatternsComponent,
    GameConfigComponent,
    GameCounterComponent,
    GameHeaderComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ gameBoard: fromGameBoard.gameBoardReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    BrowserAnimationsModule,
    MaterialModule,
    EffectsModule.forRoot([GameBoardEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
