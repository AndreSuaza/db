import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBattleComponent } from './load-battle.component';

describe('LoadBattleComponent', () => {
  let component: LoadBattleComponent;
  let fixture: ComponentFixture<LoadBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
