import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestMasterListB2bComponent } from './add-test-master-list-b2b.component';

describe('AddTestMasterListB2bComponent', () => {
  let component: AddTestMasterListB2bComponent;
  let fixture: ComponentFixture<AddTestMasterListB2bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestMasterListB2bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestMasterListB2bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
