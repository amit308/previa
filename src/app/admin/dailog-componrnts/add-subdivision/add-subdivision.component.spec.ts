import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubdivisionComponent } from './add-subdivision.component';

describe('AddSubdivisionComponent', () => {
  let component: AddSubdivisionComponent;
  let fixture: ComponentFixture<AddSubdivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubdivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
