import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFrontOfficeComponent } from './add-front-office.component';

describe('AddFrontOfficeComponent', () => {
  let component: AddFrontOfficeComponent;
  let fixture: ComponentFixture<AddFrontOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFrontOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
