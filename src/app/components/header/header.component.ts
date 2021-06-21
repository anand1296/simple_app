import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RestAPICallService } from 'src/app/services/rest-apicall.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();
  isLoggedIn:boolean = false;
  currentRouteObj: any;
  currentRoute: string;
  highlighter = '';

  constructor(private restAPICallService: RestAPICallService, private router: Router, 
    private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit(): void {

    console.log('inside header component');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((res) => {
      this.currentRouteObj = res;
      console.log(res);
      this.currentRoute = this.currentRouteObj.url;
      console.log(this.currentRoute);
      this.isLoggedIn = this.restAPICallService.getUser().isLoggedIn;
      console.log(this.isLoggedIn);
      if(this.currentRoute === '/login' || this.currentRoute === '/'){
        this.highlighter = 'login';
      }
      else if(this.currentRoute === '/register'){
        this.highlighter = 'register';
      }
      else {
        this.highlighter = '';
      }
    });

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit(this.restAPICallService.getUser());
  };

  logout() {
    console.log('logout clicked!');
    this.restAPICallService.setUser(false, '');
    this.isLoggedIn = this.restAPICallService.getUser().isLoggedIn;
    console.log(this.restAPICallService.getUser());
  }

}
