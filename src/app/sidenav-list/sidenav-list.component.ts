import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestAPICallService } from '../services/rest-apicall.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements AfterContentChecked {

  isLoggedIn:boolean = false;
  @Output() sidenavClose = new EventEmitter();

  constructor(private restAPICallService: RestAPICallService) { }

  ngAfterContentChecked() {
    // console.log('inside side nav component - ngAfterContentChecked');
    this.isLoggedIn = this.restAPICallService.getUser().isLoggedIn;
    // console.log(this.isLoggedIn);
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout() {
    console.log('logout clicked!');
    this.restAPICallService.setUser(false, '');
    this.isLoggedIn = this.restAPICallService.getUser().isLoggedIn;
    console.log(this.restAPICallService.getUser());
    console.log(this.isLoggedIn);
  }

  sideNavToggle(event){
    console.log(event);
  }

}
