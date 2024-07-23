import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';


const routes: Routes = [
  {
    path: '', component: ProductComponent, children: [
      {path:'list', component:ProductListComponent},
      {path:'edit', component:ProductEditComponent},
      {path:'detail/:id', component:ProductEditComponent},
      {path:'add', component:ProductEditComponent},
      {path:'catalogue', component:ProductCatalogueComponent},


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductRoutingModule { }

