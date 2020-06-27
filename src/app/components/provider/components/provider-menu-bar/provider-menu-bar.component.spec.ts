import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMenuBarComponent } from './provider-memu-bar.component';

describe('AdminMenuBarComponent', () => {
  let component: ProviderMenuBarComponent;
  let fixture: ComponentFixture<ProviderMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
