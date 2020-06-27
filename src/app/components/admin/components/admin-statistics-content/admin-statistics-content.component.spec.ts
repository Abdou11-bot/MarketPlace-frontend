import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsContentComponent } from './admin-statistics-content.component';

describe('AdminStatisticsContentComponent', () => {
  let component: AdminStatisticsContentComponent;
  let fixture: ComponentFixture<AdminStatisticsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
