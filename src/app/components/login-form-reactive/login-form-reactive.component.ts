import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialUser, SocialAuthService } from 'angularx-social-login';
import { RestAPICallService } from '../../services/rest-apicall.service';

@Component({
  selector: 'app-login-form-reactive',
  templateUrl: './login-form-reactive.component.html',
  styleUrls: ['./login-form-reactive.component.scss']
})
export class LoginFormReactiveComponent implements OnInit {

  loginForm: FormGroup;
  hide_password: boolean = true;
  disableForm: boolean = false;

  socialUser: SocialUser

  userDetails = {
    email: 'admin@test.com',
    password: 'testadmin'
  }

  authError = '';

  constructor(private formBuilder: FormBuilder, 
    private router: Router, private socialAuthService: SocialAuthService,
    private restAPICallService: RestAPICallService) { }

  ngOnInit(): void {

    //checking if user is already logged in
    let user_details = this.restAPICallService.getUser();
    console.log(user_details);
    if(user_details.isLoggedIn){
      this.router.navigate['home'];
    }

    // FormGroup approach
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(8)])
    // });

    //OR

    //FormBuilder approach
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    console.log(this.loginForm);

    //Social auth
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
    });

  }


  signIn(){
    console.log('Login form submitted');
    this.authError = '';
    console.log(this.loginForm);
    // if(this.loginForm.valid && this.loginForm.value.email === this.userDetails.email 
    //   && this.loginForm.value.password === this.userDetails.password){
    //   console.log('Form valid. Login successful.');
    //   let user_details = {
    //     isLoggedIn: true,
    //     email: this.loginForm.value.email
    //   };
    //   this.restAPICallService.setUser(user_details);
    //   console.log(this.restAPICallService.getUser());
    //   this.router.navigate(['home']);
    // }

    if(this.loginForm.valid){
      let enteredCredentials = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.restAPICallService.authenticateUser(enteredCredentials).subscribe((resp) => {
        console.log(resp);
        if(resp['status']) {
          this.restAPICallService.setUser(true, resp['data'][0].username);
          console.log(this.restAPICallService.getUser());
          this.router.navigate(['home']);
        }
        else {
          console.log(resp['msg']);
          this.authError = resp['msg'];
        }
        console.log('authError: ', this.authError);
      }, (err) => {
        console.log('API error!', err);
      });
    }
  }

  signIn_withGoogle(){
    console.log('Signing in with Google');
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key).setErrors(null) ;
    });
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (resp) => {
      // this.disableForm = true;
      console.log(resp);
      this.loginForm.reset();
      this.restAPICallService.setUser(true, resp.email);
      this.router.navigate(['home']);
    }).catch(() => {
      alert('Sign in unsuccessful!');
      console.log('Sign in unsuccessful!');
    });
  }

  signOut_withGoogle(){
    console.log('Signing out with Google');
    this.socialAuthService.signOut;
  }

  toggleHidePassword(event){
    event.preventDefault();
    this.hide_password = !this.hide_password
  }

}
