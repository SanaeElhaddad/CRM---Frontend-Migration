import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitationEditComponent } from './habilitation-edit.component';

describe('HabilitationEditComponent', () => {
  let component: HabilitationEditComponent;
  let fixture: ComponentFixture<HabilitationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilitationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
