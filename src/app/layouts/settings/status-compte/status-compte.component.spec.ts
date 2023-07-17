import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCompteComponent } from './status-compte.component';

describe('StatusCompteComponent', () => {
  let component: StatusCompteComponent;
  let fixture: ComponentFixture<StatusCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
