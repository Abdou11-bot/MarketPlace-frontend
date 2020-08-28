import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpecialityContentComponent } from './admin-speciality-content.component';

describe('AdminSpecialityContentComponent', () => {
  let component: AdminSpecialityContentComponent;
  let fixture: ComponentFixture<AdminSpecialityContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSpecialityContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSpecialityContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
