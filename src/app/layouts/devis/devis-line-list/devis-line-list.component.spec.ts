import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisLineListComponent } from './devis-line-list.component';

describe('DevisLineListComponent', () => {
  let component: DevisLineListComponent;
  let fixture: ComponentFixture<DevisLineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisLineListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisLineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
