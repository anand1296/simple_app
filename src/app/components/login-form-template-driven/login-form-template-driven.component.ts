import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form-template-driven',
  templateUrl: './login-form-template-driven.component.html',
  styleUrls: ['./login-form-template-driven.component.scss']
})
export class LoginFormTemplateDrivenComponent implements OnInit {

  details = {
    email: '',
    password: ''
  }

  isAvailable = false;
  applyColor = false;

  constructor() { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm, submitEvent){
    console.log(loginForm, loginForm.valid, submitEvent);

    //change to bidirectional data binding and see this variable change
    console.log("details", this.details);
  }

}
