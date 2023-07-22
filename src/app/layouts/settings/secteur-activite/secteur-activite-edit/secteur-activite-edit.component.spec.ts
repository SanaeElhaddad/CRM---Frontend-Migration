import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurActiviteEditComponent } from './secteur-activite-edit.component';

describe('SecteurActiviteEditComponent', () => {
  let component: SecteurActiviteEditComponent;
  let fixture: ComponentFixture<SecteurActiviteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecteurActiviteEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecteurActiviteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
