import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/DataService';


@Component({
    selector:'homePage-component',
    templateUrl:'homePage.component.html',
    styleUrls: ['homePage.component.css']
})

export class HomePageComponent implements OnInit {

    ads: any;

    constructor(private router: Router, public data: DataService) {
    }

    ngOnInit() {
        this.data.getAllAds().subscribe(response => {
            this.ads = response;
        });
    }

    AddToCart(id: string) {
        if (localStorage.ads !== undefined) {
            let newList = [];
            newList = JSON.parse(localStorage.ads);
            newList.push(id);
            localStorage.ads = JSON.stringify(newList);
        } else {
            let newList = [];
            newList.push(id);
            localStorage.ads = JSON.stringify(newList);
        }

        this.router.navigate(['Korpa']);
    }

    Delete(id: any) {
        //this.data.deleteAds(id)
        //.subscribe(() => {
            //reload
        //});
    }

    DetailsGo(id: string){
        this.router.navigate(['Ad/', id]);
    }

    Edit(id: string){}




}