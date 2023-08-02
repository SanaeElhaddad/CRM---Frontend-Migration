import { ProductListEditComponent } from './../layouts/product/product-list/product-list-edit/product-list-edit.component';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import {TabMenuModule} from 'primeng/tabmenu';
import {CheckboxModule} from 'primeng/checkbox';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {TranslateModule} from '@ngx-translate/core';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SettingsRoutingModule} from './../layouts/settings/settings-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';

import {
  // BadgeService,
  //
  // SupplierService,

} from './services';


import {DataTableComponent} from './components/data-table/data-table.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import {HasPermissionDirective} from './directive/hasPermission.directive';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { ClientService } from './services/api/client.service';
import { UserService } from './services/api/user.service';
import { ProductTypeService } from './services/api/product-type.service';
import { ProductService } from './services/api/product.service';
import { PoductDetailComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/poduct-detail.component';
import { ProductFicheComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-fiche/product-fiche.component';
import { ProductFinanceComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-finance/product-finance.component';
import { ProductImagesComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-images/product-images.component';
import { ProductPriceComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-price/product-price.component';
import { ProductConditionnementComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-conditionnement/product-conditionnement.component';
import { ProductService } from './services/api/product.service';
import { PoductDetailComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/poduct-detail.component';
import { ProductFicheComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-fiche/product-fiche.component';
import { ProductFinanceComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-finance/product-finance.component';
import { ProductImagesComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-images/product-images.component';
import { ProductPriceComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-price/product-price.component';
import { ProductConditionnementComponent } from '../layouts/product/product-list/product-list-edit/poduct-detail/product-conditionnement/product-conditionnement.component';


@NgModule({
  declarations: [DataTableComponent,
    HasPermissionDirective,
    ProductListEditComponent,
    PoductDetailComponent,
    ProductFicheComponent,
    ProductFinanceComponent,
    ProductImagesComponent,
    ProductPriceComponent,
    ProductConditionnementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    TranslateModule,
    DropdownModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    KeyFilterModule,
    CheckboxModule,
    TabMenuModule,
    TabViewModule,
    PanelModule,
    MultiSelectModule,
    SplitButtonModule,
    DialogModule,
    PaginatorModule,
    PanelModule,
    FieldsetModule,
    RadioButtonModule,
    NgxPermissionsModule.forChild(),
    BreadcrumbModule,
    PanelModule,


  ],
  exports: [
    DataTableComponent, NgxPermissionsModule,
    HasPermissionDirective,
    TranslateModule,
    ProductListEditComponent,
    PoductDetailComponent,
    ProductFicheComponent,
    ProductFinanceComponent,
    ProductImagesComponent,
    ProductPriceComponent,
    ProductConditionnementComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {


      ngModule: SharedModule,
      providers: [
         ProductTypeService,

         UserService,
        ClientService,
         ProductService

      ],

    };
  }
}
