import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActionEditComponent } from './status-action-edit.component';

describe('StatusActionEditComponent', () => {
  let component: StatusActionEditComponent;
  let fixture: ComponentFixture<StatusActionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusActionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusActionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
