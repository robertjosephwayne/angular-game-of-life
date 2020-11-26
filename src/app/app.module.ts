import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ConfigSliderComponent } from './game-board/game-config/config-slider/config-slider.component';
import { PatternsComponent } from './patterns/patterns.component';
import { GameConfigComponent } from './game-board/game-config/game-config.component';
import { GameCounterComponent } from './game-board/game-counter/game-counter.component';
import { ConfigCheckboxComponent } from './game-board/game-config/config-checkbox/config-checkbox.component';
import { GameBoardEffects } from './game-board/store/game-board.effects';
import * as fromGameBoard from './game-board/store/game-board.reducer';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ConfigSliderComponent,
    PatternsComponent,
    GameConfigComponent,
    GameCounterComponent,
    ConfigCheckboxComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ gameBoard: fromGameBoard.gameBoardReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([GameBoardEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
