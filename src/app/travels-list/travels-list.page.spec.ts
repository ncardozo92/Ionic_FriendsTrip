import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsListPage } from './travels-list.page';

describe('TravelsListPage', () => {
  let component: TravelsListPage;
  let fixture: ComponentFixture<TravelsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
