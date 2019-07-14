import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactModalPage } from './contact-modal.page';

describe('ContactModalPage', () => {
  let component: ContactModalPage;
  let fixture: ComponentFixture<ContactModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
