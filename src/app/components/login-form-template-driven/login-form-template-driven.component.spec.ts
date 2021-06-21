import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormTemplateDrivenComponent } from './login-form-template-driven.component';

describe('LoginFormTemplateDrivenComponent', () => {
  let component: LoginFormTemplateDrivenComponent;
  let fixture: ComponentFixture<LoginFormTemplateDrivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormTemplateDrivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
