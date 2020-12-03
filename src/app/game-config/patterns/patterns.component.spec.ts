import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PatternsComponent } from './patterns.component';

describe('PatternsComponent', () => {
  let component: PatternsComponent;
  let fixture: ComponentFixture<PatternsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatternsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore()
      ]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
