import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './material.module';

import * as fromGameBoard from './game-board/store/game-board.reducer';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PatternsComponent } from './patterns/patterns.component';
import { GameConfigComponent } from './game-config/game-config.component';
import { GameCounterComponent } from './game-counter/game-counter.component';
import { GameHeaderComponent } from './game-header/game-header.component';
import { GameBoardEffects } from './game-board/store/game-board.effects';
import { GameButtonsComponent } from './game-buttons/game-buttons.component';
import { GameGridComponent } from './game-grid/game-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    PatternsComponent,
    GameConfigComponent,
    GameCounterComponent,
    GameHeaderComponent,
    GameButtonsComponent,
    GameGridComponent
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
