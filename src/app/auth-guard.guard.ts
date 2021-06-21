import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestAPICallService } from './services/rest-apicall.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private restAPICallService: RestAPICallService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      let user_details = this.restAPICallService.getUser();
      console.log(user_details);
      if(user_details.isLoggedIn){
        return true;
      }
      else {
        console.log('Redirecting to home - not allowed!');
        // alert('User not logged in! Please log in to continue.');
        this.router.navigate['login'];
        return false;
      }
  }
  
}
