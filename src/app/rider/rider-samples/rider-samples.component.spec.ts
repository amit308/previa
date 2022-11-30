import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSamplesComponent } from './rider-samples.component';

describe('RiderSamplesComponent', () => {
  let component: RiderSamplesComponent;
  let fixture: ComponentFixture<RiderSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
