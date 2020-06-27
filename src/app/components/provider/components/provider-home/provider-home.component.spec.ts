import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderHomeComponent } from './provider-home.component';

describe('ProviderHomeComponent', () => {
  let component: ProviderHomeComponent;
  let fixture: ComponentFixture<ProviderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
