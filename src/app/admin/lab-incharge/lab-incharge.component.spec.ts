import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabInchargeComponent } from './lab-incharge.component';

describe('LabInchargeComponent', () => {
  let component: LabInchargeComponent;
  let fixture: ComponentFixture<LabInchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabInchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
