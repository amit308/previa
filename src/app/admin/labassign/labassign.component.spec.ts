import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabassignComponent } from './labassign.component';

describe('LabassignComponent', () => {
  let component: LabassignComponent;
  let fixture: ComponentFixture<LabassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
