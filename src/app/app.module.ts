import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterClientComponent } from './registerClient/registerClient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import { DataService } from './shared/DataService';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor } from './shared/intercepor';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './homePage/homePage.component';
import { AddCarComponent } from './addCar/addCar.component';
import { AddAdComponent } from './addAd/addAd.component';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdminHomePageComponent } from './adminHomePage/adminHomePage.component';
import {MatInputModule} from '@angular/material';
import { CartComponent } from './cart/cart.component';
import { DatePipe } from '@angular/common';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


const route = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registerClient', component: RegisterClientComponent},
  { path: 'homePage', component: HomePageComponent},
  { path: 'addCar', component: AddCarComponent},
  { path: 'addAd', component: AddAdComponent},
  { path: 'adminHomePage', component: AdminHomePageComponent},
  {   path: 'cart', component: CartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterClientComponent,
    HomePageComponent,
    AddCarComponent,
    AddAdComponent,
    AdminHomePageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      route,
      { enableTracing: true }
    ),
    NoopAnimationsModule,
    Ng2SearchPipeModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule, 
    NgxMatNativeDateModule,
    Ng2SearchPipeModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [DatePipe, DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
