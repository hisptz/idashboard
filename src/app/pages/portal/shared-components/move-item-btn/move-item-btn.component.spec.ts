import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveItemBtnComponent } from './move-item-btn.component';

describe('MoveItemBtnComponent', () => {
  let component: MoveItemBtnComponent;
  let fixture: ComponentFixture<MoveItemBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveItemBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveItemBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
