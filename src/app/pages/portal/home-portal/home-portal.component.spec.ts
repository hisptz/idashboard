import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePortalComponent } from './home-portal.component';

describe('HomePortalComponent', () => {
  let component: HomePortalComponent;
  let fixture: ComponentFixture<HomePortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
