import { VenteComponent } from "./vente.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DevisComponent } from "./devis/devis.component";

const routes: Routes = [
  {
    path: "",
    component: VenteComponent,
    children: [
      {
        path: "devis",
        component: DevisComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenteRoutingModule {}
