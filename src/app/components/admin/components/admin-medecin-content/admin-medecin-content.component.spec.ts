import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedecinContentComponent } from './admin-medecin-content.component';

describe('AdminMedecinContentComponent', () => {
  let component: AdminMedecinContentComponent;
  let fixture: ComponentFixture<AdminMedecinContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMedecinContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMedecinContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
