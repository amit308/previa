import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabEmployeesComponent } from './add-lab-employees.component';

describe('AddLabEmployeesComponent', () => {
  let component: AddLabEmployeesComponent;
  let fixture: ComponentFixture<AddLabEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
