import { DataTableComponent } from "./../../shared/components/data-table/data-table.component";

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsComponent } from "./settings.component";
import { GeneralComponent } from "./general/general.component";
import { ProductTypeComponent } from "./product-type/product-type.component";


const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [{ path: "general", component: GeneralComponent },
    { path: "productType", component: ProductTypeComponent }],
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
