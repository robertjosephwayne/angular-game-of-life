import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ConfigSliderComponent } from './game-config/config-slider/config-slider.component';
import { PatternsComponent } from './patterns/patterns.component';
import { GameConfigComponent } from './game-config/game-config.component';
import { GameCounterComponent } from './game-counter/game-counter.component';
import { ConfigCheckboxComponent } from './game-config/config-checkbox/config-checkbox.component';
import * as fromGameBoard from './game-board/store/game-board.reducer';
import { GameHeaderComponent } from './game-header/game-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ConfigSliderComponent,
    PatternsComponent,
    GameConfigComponent,
    GameCounterComponent,
    ConfigCheckboxComponent,
    GameHeaderComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ gameBoard: fromGameBoard.gameBoardReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
