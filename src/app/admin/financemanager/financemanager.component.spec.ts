import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancemanagerComponent } from './financemanager.component';

describe('FinancemanagerComponent', () => {
  let component: FinancemanagerComponent;
  let fixture: ComponentFixture<FinancemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
