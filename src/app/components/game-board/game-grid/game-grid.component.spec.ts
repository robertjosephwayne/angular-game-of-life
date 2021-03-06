import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState, mockState } from 'src/app/store/app.state';

import * as fromGameBoard from '../../../store/game-board/game-board.selectors';

import * as GameBoardActions from '../../../store/game-board/game-board.actions';

import { GameGridComponent } from './game-grid.component';

describe('GameGridComponent', () => {
  let component: GameGridComponent;
  let fixture: ComponentFixture<GameGridComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameGridComponent
      ],
      providers: [
        provideMockStore<AppState>({
          initialState: mockState()
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, "dispatch");
    fixture = TestBed.createComponent(GameGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the handleCellClick function with the correct row and column when a cell is clicked', () => {
    const handleCellClickSpy = spyOn(component, 'handleCellClick');
    const testRowIndex = 0;
    const testColumnIndex = 1;
    const gameTable = fixture.debugElement.query(By.css('table'));
    const allRows = gameTable.queryAll(By.css('tr'));
    const testRow = allRows[testRowIndex];
    const testRowCells = testRow.queryAll(By.css('td'));
    const testCell = testRowCells[testColumnIndex];

    testCell.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(handleCellClickSpy).toHaveBeenCalledWith(testRowIndex, testColumnIndex);
  });

  describe('ngOnInit', () => {
    it('should initialize data from the game board state', () => {
      const setGameBoardDataSpy = spyOn(component, 'setGameBoardData');
      component.ngOnInit();
      expect(setGameBoardDataSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setGameBoardData function', () => {
    it('should correctly set the currentGeneration$ property', async (done) => {
      const testSelector = fromGameBoard.selectCurrentGeneration;
      const testSelectorResult = [[0, 0], [0, 0]];
      store.overrideSelector(testSelector, testSelectorResult);
      component.currentGeneration$.subscribe(result => {
        expect(result).toEqual(testSelectorResult);
        done();
      });
    });
  });

  describe('handleCellClick function', () => {
    it('should dispatch the toggleCellLife action with the correct row and column indexes', () => {
      const rowIndex = 1;
      const columnIndex = 2;
      component.handleCellClick(rowIndex, columnIndex);
      expect(dispatchSpy).toHaveBeenCalledWith(GameBoardActions.toggleCellLife({ rowIndex, columnIndex }));
    });
  });
});
