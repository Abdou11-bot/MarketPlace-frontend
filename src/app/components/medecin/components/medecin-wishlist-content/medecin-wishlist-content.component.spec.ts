import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinWishlistContentComponent } from './medecin-wishlist-content.component';

describe('MedecinWishlistContentComponent', () => {
  let component: MedecinWishlistContentComponent;
  let fixture: ComponentFixture<MedecinWishlistContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedecinWishlistContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinWishlistContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
