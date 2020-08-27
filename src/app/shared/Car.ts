import { CarBrand } from './CarBrand';
import { CarModel } from './CarModel';
import { FuelType } from './FuelType';

export class Car
{
    id:string;
    //brandId:string;
    //carbrand: CarBrend;
    modelId:string;
    carModel: CarModel;
    fuelId:string;
    fuelType: FuelType;
    kilometars:number;   
     
    constructor
    (
        id:string,
        //brandId:string,
        //carbrand: CarBrend,
        modelId:string,
        carModel: CarModel,
        fuelId:string,
        fuelType: FuelType,
        kilometars:number
    ){
        this.id = id;
        //this.brandId = brandId;
        //this.carbrand = carbrand;
        this.modelId = modelId;
        this.carModel = carModel;
        this.fuelId = fuelId; 
        this.fuelType = fuelType;
        this.kilometars = kilometars;         
    }
}