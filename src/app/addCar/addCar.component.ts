import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../shared/DataService';
import {FormControl} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Car } from '../shared/Car';
import { CarModel } from '../shared/CarModel';



@Component({
    selector: 'addCar-component',
    templateUrl: 'addCar.component.html',
    styleUrls:['addCar.component.css']
})

export class AddCarComponent implements OnInit{

    brands: any;
    models: CarModel[];
    types: any;
    selectedBrand: any;
    selectedModel: any;
    selectedType: any;

    constructor(private router: Router, private data: DataService) {
    }

    ngOnInit() {

        this.data.getAllBrands().subscribe(response => {
           this.brands = response;
         });
        this.data.getAllModels().subscribe(response => {
          this.models = response;
        });
        this.data.getAllFuelTypes().subscribe(response => {
            this.types = response;
        });
    }

    brandChanged(){
      this.data.getAllModels().subscribe(response => {
        this.models = response;
        this.models= this.models.filter(({carBrandId}) => carBrandId === this.selectedBrand.id );
      });
     
    }

   addCar(form: NgForm) {
    const car = new Car('00000000-0000-0000-0000-000000000000',  this.selectedModel.id, this.selectedModel, this.selectedType.id, this.selectedType, form.value.kilometars);
    this.data.AddCar(car)
      .subscribe(() => {
        this.resetForm(form);
        location.reload();
      });
    }

    public resetForm(form: NgForm) {
        form.reset();
    }
  
  
}
