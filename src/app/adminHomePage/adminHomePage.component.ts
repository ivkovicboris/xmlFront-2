import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/DataService';
import { CarBrand } from '../shared/CarBrand';
import { CarModel } from '../shared/CarModel';
import { FuelType } from '../shared/FuelType';

@Component({
    selector: 'adminHomePage-component',
    templateUrl: 'adminHomePage.component.html',
    styleUrls: ['adminHomePage.component.css']
})

export class AdminHomePageComponent {
    brand:string;
    model:string;
    type:string;
    carBrands: any[];

    constructor(private router: Router, private data: DataService) {
    }
    
    ngOnInit(){
      this.data.getAllBrands()
          .subscribe(response => {
            this.carBrands = response;
          });
    }

    AddBrand() {
        const br = new CarBrand('00000000-0000-0000-0000-000000000000', this.brand);
        this.data.AddBrand(br)
          .subscribe(() => {
            location.reload();
          });
    }

    AddModel(brand: any) {
        const mod = new CarModel('00000000-0000-0000-0000-000000000000', this.model, brand.id, brand);
        this.data.AddModel(mod)
          .subscribe(() => {
            location.reload();
          });
    }

    AddFuelType() {
        const ty = new FuelType('00000000-0000-0000-0000-000000000000', this.type);
        this.data.AddFuelType(ty)
          .subscribe(() => {
            location.reload();
          });
    }
    

}