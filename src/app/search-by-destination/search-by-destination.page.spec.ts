import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDestinationPage } from './search-by-destination.page';

describe('SearchByDestinationPage', () => {
  let component: SearchByDestinationPage;
  let fixture: ComponentFixture<SearchByDestinationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByDestinationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDestinationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
