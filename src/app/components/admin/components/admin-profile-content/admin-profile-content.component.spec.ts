import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileContentComponent } from './admin-profile-content.component';

describe('AdminProfileContentComponent', () => {
  let component: AdminProfileContentComponent;
  let fixture: ComponentFixture<AdminProfileContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfileContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
