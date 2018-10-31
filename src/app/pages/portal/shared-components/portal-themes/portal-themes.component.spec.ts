import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalThemesComponent } from './portal-themes.component';

describe('PortalThemesComponent', () => {
  let component: PortalThemesComponent;
  let fixture: ComponentFixture<PortalThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
