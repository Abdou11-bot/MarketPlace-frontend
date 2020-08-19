import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinProfileContentComponent } from './medecin-profile-content.component';

describe('MedecinProfileContentComponent', () => {
  let component: MedecinProfileContentComponent;
  let fixture: ComponentFixture<MedecinProfileContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinProfileContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinProfileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
