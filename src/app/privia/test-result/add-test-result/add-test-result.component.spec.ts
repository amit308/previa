import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestResultComponent } from './add-test-result.component';

describe('AddTestResultComponent', () => {
  let component: AddTestResultComponent;
  let fixture: ComponentFixture<AddTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
