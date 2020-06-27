import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderQuotationContentComponent } from './provider-quotation-content.component';

describe('ProviderQuotationContentComponent', () => {
  let component: ProviderQuotationContentComponent;
  let fixture: ComponentFixture<ProviderQuotationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderQuotationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderQuotationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
