import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinComplaintContentComponent } from './medecin-complaint-content.component';

describe('MedecinComplaintContentComponent', () => {
  let component: MedecinComplaintContentComponent;
  let fixture: ComponentFixture<MedecinComplaintContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinComplaintContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinComplaintContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
