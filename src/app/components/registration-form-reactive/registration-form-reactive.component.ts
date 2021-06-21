import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestAPICallService } from 'src/app/services/rest-apicall.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ImageSelectorComponent } from '../image-selector/image-selector.component';

@Component({
  selector: 'app-registration-form-reactive',
  templateUrl: './registration-form-reactive.component.html',
  styleUrls: ['./registration-form-reactive.component.scss']
})
export class RegistrationFormReactiveComponent implements OnInit {

  registration_form: FormGroup;
  hide_password: boolean = true;
  form_submitted: boolean = false;
  form_reset: boolean = false;

  countries = ['India', 'Australia', 'USA', 'China', 'Russia', 'UK'];
  states = [
    {
      country: 'India',
      states: ['Maharashtra', 'Karnataka', 'Goa', 'Kerala', 'Punjab']
    },
    {
      country: 'USA',
      states: ['Texas', 'California', 'Florida', 'Alaska']
    }
  ];

  cities = [
    {
      state: 'Maharashtra',
      cities: ['Mumbai', 'Pune', 'Nashik']
    },
    {
      state: 'Goa',
      cities: ['Panaji', 'Margao', 'Vasco']
    }
  ];

  stateList = [];
  cityList = [];

  techSkillList = ['Java', 'Python', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'C#'];

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private restAPICallService: RestAPICallService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.registration_form = this.formBuilder.group({
      f_name: ['', [Validators.required]],
      l_name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['India', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      tech_skills: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      desc: ['', [Validators.required, Validators.maxLength(200)]],
    });

    console.log(this.registration_form);

    this.restAPICallService.getStates().subscribe((resp) => {
      console.log(resp);
      if(resp && resp['status']){
        this.stateList = resp['data'];
        console.log(this.stateList);
      }
      else{
        console.log('response status is undefined or false');
      }
      
    },
    (error) => {
      this.stateList = ['undefined'];
      console.log('error getting response', error);
    });

  }

  register(){
    console.log('Registration form submitted');
    
    this.form_submitted = true;
    // console.log(this.registration_form);
    if(this.registration_form.valid){
      console.log('Form valid. Registration successful.');
      console.log(this.registration_form.value);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      let dialogRef = this.dialog.open(ImageSelectorComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((avatar_url) => {
        console.log(avatar_url);
        //adding avatar url to form data
        this.registration_form.value.image = avatar_url.data ? avatar_url.data : "";
        console.log(this.registration_form.value);
        this.restAPICallService.addTenant(this.registration_form.value).subscribe((resp) => {
        console.log(resp);
          if(resp['status']){
            this.restAPICallService.setUser(true, resp['data'][0].username);
            console.log(this.restAPICallService.getUser());
            this.router.navigate(['home']);
          }
          else {
            console.log(resp['msg']);
          }
        });  
      });
    }
  }

  reset(){
    console.log('Resetting registration form');
    this.form_reset = true;
    this.stateList = [];
    this.cityList = [];
    console.log(this.registration_form);
    this.registration_form.reset();
    Object.keys(this.registration_form.controls).forEach(key => {
      this.registration_form.get(key).setErrors(null) ;
    });
  }

  countrySelected(arg_country) {
    console.log(arg_country);
    console.log(this.stateList);
    this.states.forEach(element => {
      // console.log(element);
      this.stateList = element.country.toLowerCase() === arg_country.toLowerCase() ? element.states : this.stateList;
    });
    console.log(this.stateList);

  }

  stateSelected(arg_state) {
    console.log(arg_state);
    console.log(this.cityList);
    // this.cities.forEach(element => {
    //   // console.log(element);
    //   this.cityList = element.state.toLowerCase() === arg_state.toLowerCase() ? element.cities : this.cityList;
    // });

    this.restAPICallService.getCities(arg_state).subscribe((resp) => {
      console.log(resp);
      if(resp && resp['status']){
        this.cityList = resp['data'];
        console.log(this.cityList);
      }
      else {
        this.cityList = ['undefined'];
        console.log('response status is undefined or false');
      }
    },
    (error) => {
      this.cityList = ['undefined'];
      console.log('error getting response', error);
    });
  }

}
