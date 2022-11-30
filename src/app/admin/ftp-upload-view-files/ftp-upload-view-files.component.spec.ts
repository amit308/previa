import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpUploadViewFilesComponent } from './ftp-upload-view-files.component';

describe('FtpUploadViewFilesComponent', () => {
  let component: FtpUploadViewFilesComponent;
  let fixture: ComponentFixture<FtpUploadViewFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtpUploadViewFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtpUploadViewFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
