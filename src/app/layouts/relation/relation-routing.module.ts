import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients/clients.component';
import { RouterModule, Routes } from '@angular/router';
import { RelationComponent } from './relation.component';





const routes: Routes = [
  {
    path: "",
    component: RelationComponent,
    children: [{ path: "clients", component: ClientsComponent }],
  },];

@NgModule({

  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RelationRoutingModule { }
