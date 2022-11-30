import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfinancemanagerComponent } from './addfinancemanager.component';

describe('AddfinancemanagerComponent', () => {
  let component: AddfinancemanagerComponent;
  let fixture: ComponentFixture<AddfinancemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfinancemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfinancemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
