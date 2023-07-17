import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDevisComponent } from './status-devis.component';

describe('StatusDevisComponent', () => {
  let component: StatusDevisComponent;
  let fixture: ComponentFixture<StatusDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
