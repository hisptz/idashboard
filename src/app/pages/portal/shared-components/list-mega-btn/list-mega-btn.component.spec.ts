import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMegaBtnComponent } from './list-mega-btn.component';

describe('ListMegaBtnComponent', () => {
  let component: ListMegaBtnComponent;
  let fixture: ComponentFixture<ListMegaBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMegaBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMegaBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
