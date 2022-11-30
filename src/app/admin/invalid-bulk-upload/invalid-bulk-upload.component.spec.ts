import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidBulkUploadComponent } from './invalid-bulk-upload.component';

describe('InvalidBulkUploadComponent', () => {
  let component: InvalidBulkUploadComponent;
  let fixture: ComponentFixture<InvalidBulkUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidBulkUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
