import { Car } from './Car';

export class Ad
{
    id:string;
    userId:string;
    carId:string;
    //car: Car;
    price:number;
    cwd:boolean;   
     
    constructor
    (
        id:string,
        userId:string,
        carId:string,
        //car: Car,
        price:number,
        cwd:boolean
    ){
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        //this.car = car;
        this.price = price; 
        this.cwd = cwd;         
    }
}