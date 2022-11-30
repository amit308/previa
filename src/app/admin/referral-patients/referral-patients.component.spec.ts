import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralPatientsComponent } from './referral-patients.component';

describe('ReferralPatientsComponent', () => {
  let component: ReferralPatientsComponent;
  let fixture: ComponentFixture<ReferralPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
