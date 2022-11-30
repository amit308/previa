import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsPendingTestComponent } from './patients-pending-test.component';

describe('PatientsPendingTestComponent', () => {
  let component: PatientsPendingTestComponent;
  let fixture: ComponentFixture<PatientsPendingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsPendingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsPendingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
