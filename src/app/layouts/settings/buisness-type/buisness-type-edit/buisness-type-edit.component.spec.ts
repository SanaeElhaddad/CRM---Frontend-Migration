import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessTypeEditComponent } from './buisness-type-edit.component';

describe('BuisnessTypeEditComponent', () => {
  let component: BuisnessTypeEditComponent;
  let fixture: ComponentFixture<BuisnessTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuisnessTypeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuisnessTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
