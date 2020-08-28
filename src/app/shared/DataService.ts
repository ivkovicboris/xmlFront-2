import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RegisterUser } from './RegisterUser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from './LoginUser';
import { Mail } from './Mail';
import * as jwt_decode from "jwt-decode";
import { Ad } from './Ad';
import { Car } from './Car';
import { CarBrand } from './CarBrand';
import { FuelType } from './FuelType';
import { CarModel } from './CarModel';
import { AdRequest } from './AdRequest';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};


@Injectable()
export class DataService {

    private token = '';

    constructor(private http: HttpClient) {
    }

    public Register(user: RegisterUser): Observable<any> {
        return this.http.post(environment.webApiBaseUrl + 'Account/Register', user);
    }

    public Login(creds: LoginUser): Observable<any> {
        return this.http.post(environment.webApiBaseUrl + 'Account/Login', creds);
    }

    public SentMailForRegistration(mail: Mail){
        return this.http.post(environment.webApiBaseUrl + 'Account/SentMailForRegistration', mail);
    }

    public getAllAds(): Observable<any[]> {
        return this.http.get<any[]>(environment.webApiBaseUrl + 'Ad/GetAllAds/', {
            responseType: 'json'
        });
    }

    public getAllCars(): Observable<any[]> {
        return this.http.get<any[]>(environment.webApiBaseUrl + 'Car/GetAllCars/', {
            responseType: 'json'
        });
    }
    public getAllBrands(): Observable<any[]> {
        return this.http.get<any[]>(environment.webApiBaseUrl + 'Car/GetAllBrands/', {
            responseType: 'json'
        });
    }
    public getAllModels(): Observable<any[]> {
        return this.http.get<any[]>(environment.webApiBaseUrl + 'Car/GetAllModels/', {
            responseType: 'json'
        });
    }
    public getAllFuelTypes(): Observable<any[]> {
        return this.http.get<any[]>(environment.webApiBaseUrl + 'Car/GetAllTypes/', {
            responseType: 'json'
        });
    }

    public AddAd(ad: Ad) {
        return this.http.post(environment.webApiBaseUrl + 'Ad/AddAd', ad);
    }

    public AddCar(car: Car) {
        return this.http.post(environment.webApiBaseUrl + 'Car/AddCar', car);
    }

    public AddBrand(brand: CarBrand) {
        return this.http.post(environment.webApiBaseUrl + 'Car/AddBrand', brand);
    }

    public AddModel(model: CarModel) {
        return this.http.post(environment.webApiBaseUrl + 'Car/AddModel', model);
    }

    public AddFuelType(type: FuelType) {
        return this.http.post(environment.webApiBaseUrl + 'Car/AddType', type);
    }

    public isAuthenticated(): boolean {
        this.token = localStorage.getItem('token');
        const expires = Date.parse(localStorage.expires_in);
        //proveri da li je admin ili agent
        const tokenPayload = jwt_decode(this.token);
        if (localStorage.access_token !== undefined) {
         if (Date.now() < expires) {
             if(tokenPayload.Role!=='Client')
             return true;
         } else {
                 localStorage.removeItem('expires_in');
                 localStorage.removeItem('access_token');
         }
         }
         return false;
     }

     public ConfirmResesrvation(adRequest: AdRequest) {
        return this.http.post(environment.webApiBaseUrl + 'Ad/AddAdRequest', adRequest);
    }
     
    public GetFreeAdsByDate(startDate:Date, endDate: Date) : Observable<any[]> {
        return this.http.get<any[]>(environment.webApiBaseUrl + 'Car/GetFreeAdsByDate/' + startDate +"/"+endDate, {
            responseType: 'json'
        });
    }
}
