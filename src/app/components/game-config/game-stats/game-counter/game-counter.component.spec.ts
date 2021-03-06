import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCounterComponent } from './game-counter.component';

describe('GameCounterComponent', () => {
  let component: GameCounterComponent;
  let fixture: ComponentFixture<GameCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameCounterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const gameCounterElement: HTMLElement = fixture.nativeElement;
    expect(gameCounterElement.textContent).toContain('Test Label');
  });

  it('should display the count', () => {
    component.count = 5;
    fixture.detectChanges();
    const gameCounterElement: HTMLElement = fixture.nativeElement;
    expect(gameCounterElement.textContent).toContain('5');
  });
});
