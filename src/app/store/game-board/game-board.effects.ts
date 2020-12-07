import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';

@Injectable()
export class GameBoardEffects {

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) { }

}
