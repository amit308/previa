import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultMasterComponent } from './test-result-master.component';

describe('TestResultMasterComponent', () => {
  let component: TestResultMasterComponent;
  let fixture: ComponentFixture<TestResultMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestResultMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
