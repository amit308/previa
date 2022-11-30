import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianPendingCompletedComponent } from './technician-pending-completed.component';

describe('TechnicianPendingCompletedComponent', () => {
  let component: TechnicianPendingCompletedComponent;
  let fixture: ComponentFixture<TechnicianPendingCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianPendingCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianPendingCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
