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
import { ProductTypeService } from './services/api/product-type.service';
import { UserService } from './services/api/user.service';


@NgModule({
  declarations: [DataTableComponent, HasPermissionDirective],
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
    DataTableComponent, NgxPermissionsModule, HasPermissionDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {


      ngModule: SharedModule,
      providers: [
         ProductTypeService,
         UserService

      ],

    };
  }
}
