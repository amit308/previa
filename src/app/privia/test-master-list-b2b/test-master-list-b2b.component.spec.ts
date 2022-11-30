import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMasterListB2bComponent } from './test-master-list-b2b.component';

describe('TestMasterListB2bComponent', () => {
  let component: TestMasterListB2bComponent;
  let fixture: ComponentFixture<TestMasterListB2bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMasterListB2bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMasterListB2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
