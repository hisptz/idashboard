import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardWithOpenPropComponent } from './list-card-with-open-prop.component';

describe('ListCardWithOpenPropComponent', () => {
  let component: ListCardWithOpenPropComponent;
  let fixture: ComponentFixture<ListCardWithOpenPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCardWithOpenPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardWithOpenPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
