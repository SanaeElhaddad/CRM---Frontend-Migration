import { VenteComponent } from "./vente.component";
import { VenteRoutingModule } from "./vente-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DevisComponent } from "./devis/devis.component";
import { LigneDevisComponent } from "./ligne-devis/ligne-devis.component";
import { TabViewModule } from "primeng/tabview";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { DevisParentComponent } from './devis-parent/devis-parent.component';

@NgModule({
  declarations: [VenteComponent, DevisComponent, LigneDevisComponent, DevisParentComponent],
  imports: [
    CommonModule,
    VenteRoutingModule,
    TabViewModule,
    BreadcrumbModule,
  ]
})
export class VenteModule {}
