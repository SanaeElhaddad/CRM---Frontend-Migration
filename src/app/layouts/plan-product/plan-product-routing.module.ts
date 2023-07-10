import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanProductEditComponent } from './plan-product-edit/plan-product-edit.component';
import { PlanProductListComponent } from './plan-product-list/plan-product-list.component';
import { PlanProductComponent } from './plan-product.component';


const routes: Routes = [{ path: '', component: PlanProductComponent, pathMatch: 'full' },
{ path: 'edit', component: PlanProductEditComponent},
{path: 'edit/:id', component: PlanProductEditComponent},

{ path: 'list', component: PlanProductListComponent} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PlanProductRoutingModule { }
