import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCountsComponent } from './batch-counts.component';

describe('BatchCountsComponent', () => {
  let component: BatchCountsComponent;
  let fixture: ComponentFixture<BatchCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
