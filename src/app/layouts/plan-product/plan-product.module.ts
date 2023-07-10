import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanProductComponent } from './plan-product.component';
import { PlanProductRoutingModule } from './plan-product-routing.module';
import { PlanProductListComponent } from './plan-product-list/plan-product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { PlanProductEditComponent } from './plan-product-edit/plan-product-edit.component';
import { SharedModule } from './../../shared/shared.module';
import { ControlPlanEditComponent } from './plan-product-edit/control-plan-edit/control-plan-edit.component';
import { ControlEditComponent } from './plan-product-edit/control-plan-edit/control-edit/control-edit.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  imports: [
    CommonModule,
    PlanProductRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    NgxSpinnerModule,
    CalendarModule,
    ConfirmDialogModule,
    TabViewModule,
    KeyFilterModule,
    NgbModalModule,
    NgxSpinnerModule,
    ContextMenuModule,
    StepsModule,
    PanelModule,
   SelectButtonModule,
   InputNumberModule,
   DialogModule,
   MultiSelectModule,
   BreadcrumbModule,


  ],
  declarations: [PlanProductComponent,PlanProductListComponent,PlanProductEditComponent,ControlPlanEditComponent,ControlEditComponent]

})
export class PlanProductModule { }
