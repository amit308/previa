import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestPackagesComponent } from './add-test-packages.component';

describe('AddTestPackagesComponent', () => {
  let component: AddTestPackagesComponent;
  let fixture: ComponentFixture<AddTestPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
