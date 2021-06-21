import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormReactiveComponent } from './registration-form-reactive.component';

describe('RegistrationFormReactiveComponent', () => {
  let component: RegistrationFormReactiveComponent;
  let fixture: ComponentFixture<RegistrationFormReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
