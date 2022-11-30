import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromeaComponent } from './promea.component';

describe('PromeaComponent', () => {
  let component: PromeaComponent;
  let fixture: ComponentFixture<PromeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
