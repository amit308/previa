import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianAssignComponent } from './technician-assign.component';

describe('TechnicianAssignComponent', () => {
  let component: TechnicianAssignComponent;
  let fixture: ComponentFixture<TechnicianAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
