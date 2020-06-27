import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderStatisticsContentComponent } from './provider-statistics-content.component';

describe('ProviderStatisticsContentComponent', () => {
  let component: ProviderStatisticsContentComponent;
  let fixture: ComponentFixture<ProviderStatisticsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderStatisticsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderStatisticsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
