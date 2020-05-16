import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdevisComponent } from './cartdevis.component';

describe('CartdevisComponent', () => {
  let component: CartdevisComponent;
  let fixture: ComponentFixture<CartdevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartdevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
