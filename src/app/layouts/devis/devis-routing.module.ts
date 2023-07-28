import { DevisListComponent } from "./devis-list/devis-list.component";
import { DevisMenuComponent } from "../devis-menu/devis-menu.component";
import { DevisEditComponent } from "./devis-edit/devis-edit.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DevisComponent } from "./devis.component";

const routes: Routes = [
  {
    path: "",
    component: DevisMenuComponent,
  },
  {
    path: "edit",
    component: DevisEditComponent,
  },
  {
    path: "edit/:id",
    component: DevisEditComponent,
  },
  {
    path: "list",
    component: DevisListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevisRoutingModule {}
