/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompagnieComponent } from './compagnie.component';

describe('CompagnieComponent', () => {
  let component: CompagnieComponent;
  let fixture: ComponentFixture<CompagnieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompagnieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
