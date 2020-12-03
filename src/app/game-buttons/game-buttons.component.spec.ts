import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GameButtonsComponent } from './game-buttons.component';

describe('GameButtonsComponent', () => {
  let component: GameButtonsComponent;
  let fixture: ComponentFixture<GameButtonsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameButtonsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideMockStore()
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GameButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
