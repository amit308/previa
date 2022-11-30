import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedQuoteComponent } from './accepted-quote.component';

describe('AcceptedQuoteComponent', () => {
  let component: AcceptedQuoteComponent;
  let fixture: ComponentFixture<AcceptedQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
