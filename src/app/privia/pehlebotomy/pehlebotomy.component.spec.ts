import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PehlebotomyComponent } from './pehlebotomy.component';

describe('PehlebotomyComponent', () => {
  let component: PehlebotomyComponent;
  let fixture: ComponentFixture<PehlebotomyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PehlebotomyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PehlebotomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
