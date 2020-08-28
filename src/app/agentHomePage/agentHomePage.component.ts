import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/DataService';

@Component({
    selector: 'agentHomePage-component',
    templateUrl: 'agentHomePage.component.html',
    styleUrls: ['agentHomePage.component.css']
})

export class AgentHomePageComponent {
    adAdRequests: any;

    constructor(private router: Router, private data: DataService) {
    }
    
    ngOnInit(){
      this.data.getAllAdRequests()
          .subscribe(response => {
            this.adAdRequests = response;
          });
    }
}