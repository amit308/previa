import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationApiComponent } from './organization-api.component';

describe('OrganizationApiComponent', () => {
  let component: OrganizationApiComponent;
  let fixture: ComponentFixture<OrganizationApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
