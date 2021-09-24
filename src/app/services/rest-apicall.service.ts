import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timestamp } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestAPICallService {

  currentUserDetails = { isLoggedIn: false, username: '' };
  serverUrl = "http://localhost:3010";

  constructor(private httpClient: HttpClient) { }

  setUser(isLoggedIn, user_name){
    this.currentUserDetails.isLoggedIn = isLoggedIn;
    this.currentUserDetails.username = user_name;
    // console.log(this.currentUserDetails);
    sessionStorage.setItem("currentUserDetails", JSON.stringify(this.currentUserDetails));
  }

  getUser(){
    // console.log(JSON.parse(sessionStorage.getItem("currentUserDetails")));
    if(JSON.parse(sessionStorage.getItem("currentUserDetails"))){
      return JSON.parse(sessionStorage.getItem("currentUserDetails"));
    }
    else {
      return ({isLoggedIn: false, username: ''});
    }
  }

  getStates(){
    return this.httpClient.get(this.serverUrl+'/getStates');
  }

  getCities(state) {
    return this.httpClient.get(this.serverUrl+'/getCities/'+state);
  }

  addTenant(tenant_details){
    console.log(tenant_details);
    return this.httpClient.post(this.serverUrl+'/addTenant', tenant_details);
  }

  getTenants(){
    return this.httpClient.get(this.serverUrl+'/getTenants')
  }

  getTenantNames(keyword){
    return this.httpClient.get(this.serverUrl+'/getTenantNames/'+keyword)
  }

  authenticateUser(credentials){
    console.log(credentials);
    return this.httpClient.post(this.serverUrl+'/authenticateUser', credentials);
  }

  deleteUser(username){
    console.log(username);
    return this.httpClient.delete(this.serverUrl+'/deleteUser/'+username);
  }

}
