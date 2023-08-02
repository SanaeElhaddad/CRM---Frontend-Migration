import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteMesureEditComponent } from './unite-mesure-edit.component';

describe('UniteMesureEditComponent', () => {
  let component: UniteMesureEditComponent;
  let fixture: ComponentFixture<UniteMesureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteMesureEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteMesureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
