import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let store: MockStore;
  const initialState = {
    gameBoard: {
      currentGeneration: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameBoardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState })
      ]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of initial rows', () => {
    const gameBoardElement = fixture.nativeElement;
    const gameTable = gameBoardElement.querySelector('table');
    const rows = gameTable.querySelectorAll('tr');
    expect(rows.length).toEqual(10);
  });

  it('should display the correct number of initial columns', () => {
    const gameBoardElement = fixture.nativeElement;
    const gameTable = gameBoardElement.querySelector('table');
    const firstRowCells = gameTable.querySelector('tr').cells;
    expect(firstRowCells.length).toEqual(10);
  });
});
