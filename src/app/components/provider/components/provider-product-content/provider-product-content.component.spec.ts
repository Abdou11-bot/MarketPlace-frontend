import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProductContentComponent } from './provider-product-content.component';

describe('ProviderProductContentComponent', () => {
  let component: ProviderProductContentComponent;
  let fixture: ComponentFixture<ProviderProductContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderProductContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderProductContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
