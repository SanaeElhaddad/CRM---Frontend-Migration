import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOpportuniteComponent } from './status-opportunite.component';

describe('StatusOpportuniteComponent', () => {
  let component: StatusOpportuniteComponent;
  let fixture: ComponentFixture<StatusOpportuniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOpportuniteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusOpportuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
