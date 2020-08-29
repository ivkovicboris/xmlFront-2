import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/DataService';
import * as jwt_decode from "jwt-decode";
import { Ad } from '../shared/Ad';
import { DatePipe } from '@angular/common';
import { AdAdRequest } from '../shared/AdAdRequest';
import { AdRequest } from '../shared/AdRequest';


@Component({
    selector:'homePage-component',
    templateUrl:'homePage.component.html',
    styleUrls: ['homePage.component.css']
})

export class HomePageComponent implements OnInit {
    newAdAdRequest : AdAdRequest;
    listOfAdAdRequest:Array<AdAdRequest>;
    newAdRequest:AdRequest;
    startDate:Date;
    endDate:Date;
    ads: any;
    userId: any;
    isClient = true;
    constructor(private router: Router, public data: DataService, public datepipe: DatePipe) {
    }

    localsto

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userId = decodeToken.jti;
              if(decodeToken.Role=="Agent" || decodeToken.Role=="Admin"){
                  this.isClient = false;
              }
        this.data.getAllAds().subscribe(response => {
            this.ads = response;
        });
    }

    SearchAds(startDate:Date, endDate: Date){
        localStorage.setItem('startDate' , this.datepipe.transform(startDate, 'yyyy-MM-dd'));
        localStorage.setItem('endDate', this.datepipe.transform(endDate, 'yyyy-MM-dd'));
        
        this.data.GetFreeAdsByDate(startDate, endDate).subscribe (response =>{
            this.ads = response;
        })
    }

    AddToCart(ad:Ad) {
        if (localStorage.ads !== undefined) {
            let newList = [];
            newList = JSON.parse(localStorage.ads);
            newList.push(ad);
            localStorage.ads = JSON.stringify(newList);
        } else {
            let newList = [];
            newList.push(ad);
            localStorage.ads = JSON.stringify(newList);
        }
        
        this.router.navigate(['/Cart']);
    }

    BookAdByAdmin(ad: Ad){
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
        this.data.BookAdByAdmin(this.newAdRequest).subscribe (response =>{
            if(response){
                alert('succesfull');
            } else {
                alert('error');
            }
        });
    }

    Delete(id: any) {
        //this.data.deleteAds(id)
        //.subscribe(() => {
            //reload
        //});
    }

    ShowDetails(id: string){
        this.router.navigate(['Ad/', id]);
    }

    Edit(id: string){}

    CreateNewAdd() {
        this.router.navigate(["/addAd"]);
    }


}