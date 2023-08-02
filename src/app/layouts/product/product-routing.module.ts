import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { PoductDetailComponent } from './product-list/product-list-edit/poduct-detail/poduct-detail.component';


const routes: Routes = [
  {
    path: '', component: ProductComponent, children: [
      {path:'list', component:ProductListComponent},
      {path:'edit', component:ProductEditComponent},
      {path:'detail/:id', component:PoductDetailComponent}


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }

