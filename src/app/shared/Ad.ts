import { Car } from './Car';
import { AdAdRequest } from './AdAdRequest';

export class Ad
{
    id:string;
    userId:string;
    carId:string;
    //car: Car;
    price:number;
    cwd:boolean;   
    adAdRequests: Array<AdAdRequest>;
     
    constructor
    (
        id:string,
        userId:string,
        carId:string,
        //car: Car,
        price:number,
        cwd:boolean,
        adAdRequests:Array<AdAdRequest>
    ){
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        //this.car = car;
        this.price = price; 
        this.cwd = cwd;     
        this.adAdRequests = adAdRequests;   
    }
}