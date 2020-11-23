import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import * as fromGameBoard from './game-board/store/game-board.reducer';
import { ConfigSliderComponent } from './config-slider/config-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ConfigSliderComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ gameBoard: fromGameBoard.gameBoardReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
