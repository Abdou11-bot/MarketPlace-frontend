import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriebarComponent } from './categoriebar.component';

describe('CategoriebarComponent', () => {
  let component: CategoriebarComponent;
  let fixture: ComponentFixture<CategoriebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
