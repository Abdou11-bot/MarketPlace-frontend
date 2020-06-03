import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListspecialitiesComponent } from './listspecialities.component';

describe('ListspecialitiesComponent', () => {
  let component: ListspecialitiesComponent;
  let fixture: ComponentFixture<ListspecialitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListspecialitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListspecialitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
