import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderComplaintContentComponent } from './provider-complaint-content.component';

describe('ProviderComplaintContentComponent', () => {
  let component: ProviderComplaintContentComponent;
  let fixture: ComponentFixture<ProviderComplaintContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderComplaintContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderComplaintContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
