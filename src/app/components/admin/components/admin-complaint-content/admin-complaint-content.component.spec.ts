import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComplaintContentComponent } from './admin-complaint-content.component';

describe('AdminComplaintContentComponent', () => {
  let component: AdminComplaintContentComponent;
  let fixture: AdminComplaintContentComponent<AdminMessageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComplaintContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComplaintContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
