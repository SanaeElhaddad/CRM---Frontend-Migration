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
        path: "relation",
        loadChildren: () =>
          import("./relation/relation.module").then((m) => m.RelationModule),
      },
      // { path: 'plan-product', loadChildren: () => import('./plan-product/plan-product.module').then(m => m.PlanProductModule) },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLayoutRoutingModule {}
