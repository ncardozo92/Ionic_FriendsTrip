import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelModalPage } from './travel-modal.page';

describe('TravelModalPage', () => {
  let component: TravelModalPage;
  let fixture: ComponentFixture<TravelModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
