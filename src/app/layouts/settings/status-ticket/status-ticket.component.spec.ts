import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTicketComponent } from './status-ticket.component';

describe('StatusTicketComponent', () => {
  let component: StatusTicketComponent;
  let fixture: ComponentFixture<StatusTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
