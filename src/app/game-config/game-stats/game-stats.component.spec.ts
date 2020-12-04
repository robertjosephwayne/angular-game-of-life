import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GameStatsComponent } from './game-stats.component';

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;
  let store: MockStore;
  const initialState = {
    gameStats: {
      generationCount: 0,
      liveCells: 0
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameStatsComponent]
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
    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
