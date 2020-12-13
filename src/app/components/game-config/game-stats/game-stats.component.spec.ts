import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState, mockState } from 'src/app/store/app.state';

import * as fromGameBoard from '../../../store/game-board/game-board.selectors';

import { GameStatsComponent } from './game-stats.component';

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameStatsComponent,
      ],
      providers: [
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize data from the game board state', () => {
      const setGameBoardDataSpy = spyOn(component, 'setGameBoardData');
      component.ngOnInit();
      expect(setGameBoardDataSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setGameBoardData function', () => {

  });
});
