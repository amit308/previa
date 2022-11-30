import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMasterListComponent } from './test-master-list.component';

describe('TestMasterListComponent', () => {
  let component: TestMasterListComponent;
  let fixture: ComponentFixture<TestMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
