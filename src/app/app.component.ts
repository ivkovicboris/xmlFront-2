import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xmlfrontagent';
  token: any;

  constructor(private router: Router) {}

  HomePageRouting(){
    this.token = localStorage.getItem('token');
    const tokenPayload = jwt_decode(this.token);
    if(this.token==null){
      this.router.navigate(['/login'])
    }
    
    if (tokenPayload.Role=='Client') { this.router.navigate(['/homePage/']);}      
    else if (tokenPayload.Role=='Agent'){ this.router.navigate(['/homePage/']);}
    else if (tokenPayload.Role=='Admin'){ this.router.navigate(['/adminHomePage/']);}
  }

  LogOut(){
    this.token = localStorage.setItem('token', null);
    this.router.navigate(['/login'])
  }
}