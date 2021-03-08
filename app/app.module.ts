import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogovanjeComponent } from './logovanje/logovanje.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import {RecaptchaModule} from 'ng-recaptcha';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AzuriranjeComponent } from './azuriranje/azuriranje.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MagacinComponent } from './magacin/magacin.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ShopComponent } from './shop/shop.component';
import { StepperComponent } from './stepper/stepper.component'
import {MatStepperModule} from '@angular/material/stepper';
import { NudiComponent } from './nudi/nudi.component';
import { BaroviComponent } from './barovi/barovi.component';
import {ChartsModule} from 'ng2-charts';
import { DetaljiComponent } from './detalji/detalji.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistracijaComponent,
    LogovanjeComponent,
    AdminComponent,
    PoljoprivrednikComponent,
    PreduzeceComponent,
    RasadnikComponent,
    AzuriranjeComponent,
    MagacinComponent,
    ShopComponent,
    StepperComponent,
    NudiComponent,
    BaroviComponent,
    DetaljiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    MatProgressBarModule,
    MatStepperModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
