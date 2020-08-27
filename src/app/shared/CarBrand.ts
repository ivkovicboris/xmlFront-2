import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarModel } from './CarModel';

export class CarBrand
{
    id:string;
    name:string;
   // modelsOfBrand: Array<CarModel>;
      
     
    constructor
    (
        id:string,
        name:string,
       // modelsOfBrand: Array<CarModel>
        
    ){
        this.id = id;
        this.name = name;  
        //this.modelsOfBrand = modelsOfBrand;
          
    }
}