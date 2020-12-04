import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GameConfigComponent } from './game-config.component';

describe('GameConfigComponent', () => {
  let component: GameConfigComponent;
  let fixture: ComponentFixture<GameConfigComponent>;
  let store: MockStore;
  const initialState = {
    gameConfig: {
      maxTickInterval: 1000,
      autoTicking: false,
      tickInterval: 500,
      ticker: null,
      randomLifeActive: false,
      minGridSize: 10,
      maxGridSize: 25,
      gridSize: 10
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameConfigComponent]
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
    fixture = TestBed.createComponent(GameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
