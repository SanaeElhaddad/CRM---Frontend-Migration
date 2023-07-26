import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneDevisComponent } from './ligne-devis.component';

describe('LigneDevisComponent', () => {
  let component: LigneDevisComponent;
  let fixture: ComponentFixture<LigneDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigneDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
