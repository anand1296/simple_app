import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormTemplateDrivenComponent } from './registration-form-template-driven.component';

describe('RegistrationFormTemplateDrivenComponent', () => {
  let component: RegistrationFormTemplateDrivenComponent;
  let fixture: ComponentFixture<RegistrationFormTemplateDrivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormTemplateDrivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
