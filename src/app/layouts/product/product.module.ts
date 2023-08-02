import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import { HttpClientModule } from '@angular/common/http';
import {PanelModule} from 'primeng/panel';
import { ProductComponent } from './product.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PaginatorModule} from 'primeng/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import { SharedModule } from './../../shared/shared.module';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { ProductListEditComponent } from './product-list/product-list-edit/product-list-edit.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { PoductDetailComponent } from './product-list/product-list-edit/poduct-detail/poduct-detail.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import { ProductFicheComponent } from './product-list/product-list-edit/poduct-detail/product-fiche/product-fiche.component';
import { ProductFinanceComponent } from './product-list/product-list-edit/poduct-detail/product-finance/product-finance.component';
import { ProductImagesComponent } from './product-list/product-list-edit/poduct-detail/product-images/product-images.component';
import { ProductPriceComponent } from './product-list/product-list-edit/poduct-detail/product-price/product-price.component';
import { ProductConditionnementComponent } from './product-list/product-list-edit/poduct-detail/product-conditionnement/product-conditionnement.component';
import { ReactiveFormsModule } from '@angular/forms';










@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductEditComponent,
    PoductDetailComponent,
    ProductFicheComponent,
    ProductFinanceComponent,
    ProductImagesComponent,
    ProductPriceComponent,
    ProductConditionnementComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    DataViewModule,
    HttpClientModule,
    PanelModule,
    ProductRoutingModule,
    BreadcrumbModule,
    AutoCompleteModule,
    PaginatorModule,
    NgxSpinnerModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    RatingModule,
    RippleModule,
    SharedModule,
    CommonModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    InputTextareaModule,
    RadioButtonModule,
    TabViewModule,
    ReactiveFormsModule



  ]
})
export class ProductModule { }
