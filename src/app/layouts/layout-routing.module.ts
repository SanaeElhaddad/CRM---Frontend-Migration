import { LayoutComponent } from "./layout.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/settings.module").then((m) => m.SettingsModule),
      },
      {
        path: "devis",
        loadChildren: () =>
          import("./devis/devis.module").then((m) => m.DevisModule),
      },
      {
        path: "relation",
        loadChildren: () =>
          import("./relation/relation.module").then((m) => m.RelationModule),
      },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLayoutRoutingModule {}
