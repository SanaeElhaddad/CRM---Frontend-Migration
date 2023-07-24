import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisEditComponent } from './prerequis-edit.component';

describe('PrerequisEditComponent', () => {
  let component: PrerequisEditComponent;
  let fixture: ComponentFixture<PrerequisEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrerequisEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrerequisEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
