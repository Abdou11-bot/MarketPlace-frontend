import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinQuotationContentComponent } from './medecin-quotation-content.component';

describe('MedecinQuotationContentComponent', () => {
  let component: MedecinQuotationContentComponent;
  let fixture: ComponentFixture<MedecinQuotationContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinQuotationContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinQuotationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
