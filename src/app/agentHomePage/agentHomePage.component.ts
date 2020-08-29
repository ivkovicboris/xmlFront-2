import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/DataService';
import { AdAdRequest } from '../shared/AdAdRequest';

@Component({
    selector: 'agentHomePage-component',
    templateUrl: 'agentHomePage.component.html',
    styleUrls: ['agentHomePage.component.css']
})

export class AgentHomePageComponent {
    adAdRequests: any;
    adAdAccepted: any;

    constructor(private router: Router, private data: DataService) {
    }
    
    ngOnInit(){
      this.data.getAllAdRequests()
          .subscribe(response => {
            this.adAdRequests = response;
            this.data.getAllAdAccepted()
                      .subscribe(response => {
                      this.adAdAccepted = response;
            
            });
          });
    }

    Accept(adAdRequest: AdAdRequest){
      this.data.AcceptAdRequest(adAdRequest).subscribe(response =>{
        if(response){
          alert("succesful");
        } else {
          alert("error");
        }
      });
    }

    FinishRent(adAdAcc: AdAdRequest){
      this.data.FinishRent(adAdAcc).subscribe(response =>{
        if(response){
          alert("succesful");
        } else {
          alert("error");
        }
      });
    }
}