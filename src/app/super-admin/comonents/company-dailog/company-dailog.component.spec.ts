import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDailogComponent } from './company-dailog.component';

describe('CompanyDailogComponent', () => {
  let component: CompanyDailogComponent;
  let fixture: ComponentFixture<CompanyDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
