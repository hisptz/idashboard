import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardMenuComponent } from '../../components/dashboard-menu/dashboard-menu.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardMenuListComponent } from '../../components/dashboard-menu-list/dashboard-menu-list.component';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';
import { DashboardMenuItemComponent } from '../../components/dashboard-menu-item/dashboard-menu-item.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      declarations: [
        DashboardComponent,
        DashboardMenuComponent,
        DashboardMenuListComponent,
        DashboardMenuItemComponent,
        FilterByNamePipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
