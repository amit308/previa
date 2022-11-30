import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRecieptDetailsComponent } from './sample-reciept-details.component';

describe('SampleRecieptDetailsComponent', () => {
  let component: SampleRecieptDetailsComponent;
  let fixture: ComponentFixture<SampleRecieptDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleRecieptDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleRecieptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
