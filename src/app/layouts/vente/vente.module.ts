import { VenteRoutingModule } from './vente-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevisComponent } from './devis/devis.component';



@NgModule({
  declarations: [DevisComponent],
  imports: [
    CommonModule,
    VenteRoutingModule
  ]
})
export class VenteModule { }
