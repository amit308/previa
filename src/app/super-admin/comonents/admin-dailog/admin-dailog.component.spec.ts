import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDailogComponent } from './admin-dailog.component';

describe('AdminDailogComponent', () => {
  let component: AdminDailogComponent;
  let fixture: ComponentFixture<AdminDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
