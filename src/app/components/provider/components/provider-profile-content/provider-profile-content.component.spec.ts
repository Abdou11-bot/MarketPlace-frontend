import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProfileContentComponent } from './provider-profile-content.component';

describe('ProviderProfileContentComponent', () => {
  let component: ProviderProfileContentComponent;
  let fixture: ComponentFixture<ProviderProfileContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderProfileContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderProfileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
