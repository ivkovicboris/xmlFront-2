import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/DataService';
import * as jwt_decode from "jwt-decode";
import { AdRequest } from '../shared/AdRequest';
import { AdAdRequest } from '../shared/AdAdRequest';
import {ThemePalette} from '@angular/material/core';


@Component({
    selector:'cart-component',
    templateUrl:'cart.component.html',
    styleUrls: ['cart.component.css']
})

export class CartComponent implements OnInit {

    ads: any;
    userId: any;
    isClient = true;
    bundle = false;
    startDate:Date;
    endDate:Date;
    newAdRequest:AdRequest;
    newList = [];
    listOfAdAdRequest:Array<AdAdRequest>;
    newAdAdRequest : AdAdRequest;

    constructor(private router: Router, public data: DataService) {
    }

    

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userId = decodeToken.jti;

        this.newList = JSON.parse( localStorage.ads);
        this.startDate = new Date(/*localStorage.getItem('startDate')*/);
        //this.endDate = new Date(localStorage.getItem('endDate'));
        this.endDate = new Date();
        this.endDate.setDate(30);
    }
    

    ConfirmResevation(){
        if(this.bundle){
            this.listOfAdAdRequest = new Array<AdAdRequest>();
            this.newList.forEach(ad => {
                this.newAdAdRequest = new AdAdRequest(
                    ad.id,
                    ad,
                    "00000000-0000-0000-0000-000000000000",
                    null
                )
                this.listOfAdAdRequest.push(this.newAdAdRequest);
            });
             
            this.newAdRequest = new AdRequest(
                '00000000-0000-0000-0000-000000000000',
                this.userId,
                this.startDate,
                this.endDate,
                "",
                this.listOfAdAdRequest
            );
            this.data.ConfirmResesrvation(this.newAdRequest).subscribe (response =>{
                if(response) alert('succesfull');
            });

        } else {
            this.newList.forEach(ad => {
                    this.newAdAdRequest = new AdAdRequest(
                        ad.id,
                        ad,
                        "00000000-0000-0000-0000-000000000000",
                        null
                    )
                    this.newAdRequest = new AdRequest(
                        '00000000-0000-0000-0000-000000000000',
                        this.userId,
                        this.startDate,
                        this.endDate,
                        "",
                        [this.newAdAdRequest]
                    );
                    this.data.ConfirmResesrvation(this.newAdRequest).subscribe (response =>{
                        if(response){
                            alert('succesfull');
                        }
                    });
            });
        }
    }

    ShowDetails(carId: string){}
}