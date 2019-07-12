import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDeckComponent } from './load-deck.component';

describe('LoadDeckComponent', () => {
  let component: LoadDeckComponent;
  let fixture: ComponentFixture<LoadDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
