import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByFlightPage } from './search-by-flight.page';

describe('SearchByFlightPage', () => {
  let component: SearchByFlightPage;
  let fixture: ComponentFixture<SearchByFlightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByFlightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByFlightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
