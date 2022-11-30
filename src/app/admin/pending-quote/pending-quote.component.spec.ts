import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingQuoteComponent } from './pending-quote.component';

describe('PendingQuoteComponent', () => {
  let component: PendingQuoteComponent;
  let fixture: ComponentFixture<PendingQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
