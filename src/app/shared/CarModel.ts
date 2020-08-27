import { CarBrand } from './CarBrand';

export class CarModel
{
    id:string;
    name:string;   
    carBrandId: string;
    carBrand: CarBrand;
     
    constructor
    (
        id:string,
        name:string,
        carbrandId: string,
        carBrand: CarBrand
    ){
        this.id = id;
        this.name = name;   
        this.carBrandId = carbrandId;    
        this.carBrand = carBrand;
    }
}