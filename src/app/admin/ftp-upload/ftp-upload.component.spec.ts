import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpUploadComponent } from './ftp-upload.component';

describe('FtpUploadComponent', () => {
  let component: FtpUploadComponent;
  let fixture: ComponentFixture<FtpUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtpUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtpUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
