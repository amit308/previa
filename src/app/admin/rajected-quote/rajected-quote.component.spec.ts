import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RajectedQuoteComponent } from './rajected-quote.component';

describe('RajectedQuoteComponent', () => {
  let component: RajectedQuoteComponent;
  let fixture: ComponentFixture<RajectedQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RajectedQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RajectedQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
