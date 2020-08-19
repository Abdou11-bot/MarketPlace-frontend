import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinMenuBarComponent } from './medecin-memu-bar.component';

describe('MedecinMenuBarComponent', () => {
  let component: MedecinMenuBarComponent;
  let fixture: ComponentFixture<MedecinMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
