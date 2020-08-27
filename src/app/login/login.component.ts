import { DataService } from '../shared/DataService';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginUser } from '../shared/LoginUser';
import * as jwt_decode from "jwt-decode";
import { Component } from '@angular/core';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    
    public error:boolean = true;
    public token:any;
    public id:any;
    constructor(private data: DataService, private router: Router) {}

    onLogin(form: NgForm){
        const user = new LoginUser(form.value.email, form.value.password)
        
        this.data.Login(user).subscribe(token => {
            this.token = token;
            
            if (this.token == null) { 
              alert('Invalid Email or Password!\n Make sure to check your email for confirmation link if you have not so far!'); 
            } else {
              localStorage.setItem('token', this.token.token);
              localStorage.setItem('expires_in', this.token.expiration);
              const tokenPayload = jwt_decode(this.token.token);
              this.id = tokenPayload.jti;
              if (tokenPayload.Role=='Client') { this.router.navigate(['/homePage']);}
              else if (tokenPayload.Role=='Agent'){ this.router.navigate(['/homePage']);}
              else if (tokenPayload.Role=='Admin'){ this.router.navigate(['/adminHomePage']);}
            }
      });
          
    }
    
}