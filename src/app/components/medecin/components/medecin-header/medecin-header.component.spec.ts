import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinHeaderComponent } from './medecin-header.component';

describe('MedecinHeaderComponent', () => {
  let component: MedecinHeaderComponent;
  let fixture: ComponentFixture<MedecinHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
