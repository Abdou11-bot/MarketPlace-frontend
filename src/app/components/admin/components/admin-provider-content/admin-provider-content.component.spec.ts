import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProviderContentComponent } from './admin-provider-content.component';

describe('AdminProviderContentComponent', () => {
  let component: AdminProviderContentComponent;
  let fixture: ComponentFixture<AdminProviderContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProviderContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProviderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
