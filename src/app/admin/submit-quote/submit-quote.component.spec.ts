import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitQuoteComponent } from './submit-quote.component';

describe('SubmitQuoteComponent', () => {
  let component: SubmitQuoteComponent;
  let fixture: ComponentFixture<SubmitQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
