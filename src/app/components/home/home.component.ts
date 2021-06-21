import { Component, OnInit } from '@angular/core';
import { RestAPICallService } from 'src/app/services/rest-apicall.service';
import * as stubdata from '../../stubs/users.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails = [];
  defaultUserImage = 'https://t3.ftcdn.net/jpg/02/55/42/58/240_F_255425846_LsbkvwczOnFDmS4nQYnFTYrx49Q0tj15.jpg';

  constructor(private restAPICallService: RestAPICallService) { }

  ngOnInit(): void {
    // this.userDetails = stubdata.userDetails;
    this.restAPICallService.getTenants().subscribe((resp) => {
      console.log(resp);
      if(resp && resp['status']){
        this.userDetails = resp['data'];
        console.log(this.userDetails);
        //handling no image
        this.userDetails.forEach(element => {
          if(element.image.length === 0){
            element.image = this.defaultUserImage;
          }
        });
      }
      else {
        console.log(resp['msg']);
      }
    });
    // console.log(this.userDetails);
  }

  deleteUser(user){
    console.log(user);
    // console.log(this.userDetails.indexOf(user));
    // this.userDetails.splice(this.userDetails.indexOf(user), 1);
    // console.log(this.userDetails);
    this.restAPICallService.deleteUser(user.email).subscribe((resp) => {
      if(resp['status']){
        console.log(resp['msg']);
        this.userDetails = resp['data'];
        console.log(this.userDetails);
        //handling no image
        this.userDetails.forEach(element => {
          if(element.image.length === 0){
            element.image = this.defaultUserImage;
          }
        });
      }
      else {
        //failed to delete user
        console.log(resp['msg']);
      }
    },(err) => {
      console.log('rest API error', err);
    }); 
  }
  
}