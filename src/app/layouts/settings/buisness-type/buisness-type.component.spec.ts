import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessTypeComponent } from './buisness-type.component';

describe('BuisnessTypeComponent', () => {
  let component: BuisnessTypeComponent;
  let fixture: ComponentFixture<BuisnessTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuisnessTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuisnessTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
