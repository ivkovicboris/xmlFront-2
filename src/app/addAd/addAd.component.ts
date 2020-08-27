import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/DataService';
import { Car } from '../shared/Car';
import { Ad } from '../shared/Ad';
import * as jwt_decode from "jwt-decode";


@Component({
    selector: 'addAd-component',
    templateUrl: 'addAd.component.html',
    styleUrls:['addAd.component.css']
})

export class AddAdComponent implements OnInit{

    isCoverImageUrl: boolean = false;
    ready = false;
    cars:any;
    selectedItems:any;
    userId:any;
    selectedCar: any;

    constructor(private router: Router, private data: DataService) {
    }

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userId = decodeToken.jti;
        this.data.getAllCars().subscribe(data => {
            this.cars = data;
          });

    }

   newAd(form: NgForm) {
    const ad = new Ad('00000000-0000-0000-0000-000000000000',this.userId, this.selectedCar.id, form.value.price, form.value.cwd);
    this.data.AddAd(ad).subscribe(() => {
        this.resetForm(form);
        location.reload();
    });
  }

  public resetForm(form: NgForm) {
    form.reset();
  }
}