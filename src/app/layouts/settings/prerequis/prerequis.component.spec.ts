import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisComponent } from './prerequis.component';

describe('PrerequisComponent', () => {
  let component: PrerequisComponent;
  let fixture: ComponentFixture<PrerequisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrerequisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerequisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
