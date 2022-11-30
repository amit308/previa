import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganizationAdminComponent } from './add-organization-admin.component';

describe('AddOrganizationAdminComponent', () => {
  let component: AddOrganizationAdminComponent;
  let fixture: ComponentFixture<AddOrganizationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrganizationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrganizationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
