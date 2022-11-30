import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivedQuoteComponent } from './recived-quote.component';

describe('RecivedQuoteComponent', () => {
  let component: RecivedQuoteComponent;
  let fixture: ComponentFixture<RecivedQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecivedQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecivedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
