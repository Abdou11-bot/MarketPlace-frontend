import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMainContentComponent } from './provider-main-content.component';

describe('ProviderMainContentComponent', () => {
  let component: ProviderMainContentComponent;
  let fixture: ComponentFixture<ProviderMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
