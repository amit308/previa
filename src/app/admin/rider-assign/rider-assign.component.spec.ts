import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderAssignComponent } from './rider-assign.component';

describe('RiderAssignComponent', () => {
  let component: RiderAssignComponent;
  let fixture: ComponentFixture<RiderAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
