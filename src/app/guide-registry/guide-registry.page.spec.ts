import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideRegistryPage } from './guide-registry.page';

describe('GuideRegistryPage', () => {
  let component: GuideRegistryPage;
  let fixture: ComponentFixture<GuideRegistryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideRegistryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideRegistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
