import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisMenuComponent } from './devis-menu.component';

describe('DevisMenuComponent', () => {
  let component: DevisMenuComponent;
  let fixture: ComponentFixture<DevisMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
