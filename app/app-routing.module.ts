import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogovanjeComponent } from './logovanje/logovanje.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AdminComponent } from './admin/admin.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PoljoprivrednikComponent } from './poljoprivrednik/poljoprivrednik.component';
import { RasadnikComponent } from './rasadnik/rasadnik.component';
import { AzuriranjeComponent } from './azuriranje/azuriranje.component';
import { MagacinComponent } from './magacin/magacin.component';
import { ShopComponent } from './shop/shop.component';
import { StepperComponent } from './stepper/stepper.component';
import { NudiComponent } from './nudi/nudi.component';
import { BaroviComponent } from './barovi/barovi.component';
import { DetaljiComponent } from './detalji/detalji.component';


const routes: Routes = [
  {path:"" , component:LogovanjeComponent},
  {path:"log", component:LogovanjeComponent},
  {path:"reg", component:RegistracijaComponent},
  {path:"admin", component:AdminComponent},
  {path:"poljoprivrednik",component:PoljoprivrednikComponent},
  {path:"preduzece", component: PreduzeceComponent},
  {path:"rasadnik",component:RasadnikComponent},
  {path:"azuriranje",component:AzuriranjeComponent},
  {path:"magacin",component:MagacinComponent},
  {path:"shop",component:ShopComponent},
  {path:"stepper",component:StepperComponent},
  {path:"nudi",component:NudiComponent},
  {path:"barovi",component:BaroviComponent},
  {path:"detalji",component:DetaljiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
