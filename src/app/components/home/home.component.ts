import { Component, OnInit } from '@angular/core';
import { RestAPICallService } from 'src/app/services/rest-apicall.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import * as stubdata from '../../stubs/users.json';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userDetails = [];
  defaultUserImage = 'https://t3.ftcdn.net/jpg/02/55/42/58/240_F_255425846_LsbkvwczOnFDmS4nQYnFTYrx49Q0tj15.jpg';
  searchVal = '';

  searchControl = new FormControl();
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]>;
  customFilter: boolean = true;
  tenantNameList = [];

  constructor(private restAPICallService: RestAPICallService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.userDetails = stubdata.userDetails;
    this.filteredStreets = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

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
        //populating autocomplete
        this.userDetails.forEach(element => {
          this.tenantNameList.push(element.name);
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      text: "Are you sure you want to continue?"
    };
    let dialogRef = this.dialog.open(PopUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if(data.resp.toLowerCase() === 'positive') {
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
      else {
        console.log('Pop up was cancelled!');
      }
    });

  }

  _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getList = (keyword) => {
    console.log('trigerring API call');
    console.log(keyword);
    this.restAPICallService.getTenantNames(keyword).subscribe((resp) => {
      if(resp['status']){
        console.log(resp);
        this.tenantNameList = resp['data'];
      }
      else {
        console.log(resp['msg']);
      }
    }, (err) => {
      console.log('rest API error', err);
    });
  }

  debounce = (fn, keyword, d) => {
    console.log('inside doSomeMagic');
    let timer;
    return function() {
      console.log(this);
      let context = this,
        args = arguments;
      // context.keyword = keyword;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(context, keyword);
      }, d)
    }
  }
  
  onKeyUp = (event) => {
    console.log('inside onKeyUp');
    console.log(event.target.value);
    let keyword: string = event.target.value;
    let alphanumericRegex = /^[a-z0-9]+$/i;
    //implemennting the concept of debouncing so that the API call doesn't happen for every keyup
    if(keyword.trim().length > 0 && alphanumericRegex.test(keyword)){
      const betterFunction = this.debounce(this.getList, keyword, 500);
      betterFunction();
    }
  }



}