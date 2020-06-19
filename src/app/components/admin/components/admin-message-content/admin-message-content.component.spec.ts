import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessageContentComponent } from './admin-message-content.component';

describe('AdminMessageContentComponent', () => {
  let component: AdminMessageContentComponent;
  let fixture: ComponentFixture<AdminMessageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMessageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
