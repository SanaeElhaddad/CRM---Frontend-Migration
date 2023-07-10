import { ReceptionStockService } from './services/api/reception-stock.service';
import { OrderStatusService } from './services/api/order-status.service';
import { ReceptionLineService } from './services/api/reception-line.service';
import { PurchaseOrder } from './models/purchase-order';
import { PurchaseOrderLineService } from './services/api/purchase-order-line.service';
import { OrderTypeService } from './services/api/order-type.service';
import { ReceptionService } from './services/api/reception.service';
import { PurchaseOrderService } from './services/api/purchase-order.service';
import { StockService } from './services/api/stock.service';
import { ProductService } from './services/api/product.service';
import { ProductTypeService } from './services/api/product-type.service';

import { AddressService } from './services/api/address.service';

import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsRoutingModule } from './../layouts/settings/settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/api/user.service';
import { AuthenticationService } from './services/api/authentication.service';
import { SaleOrderService } from './services/api/sale-order.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeliveryLineService } from './services/api/delivery-line.service';
import { DeliveryService } from './services/api/Delivery.service';
import { VatService } from './services/api/vat.service';
import { ZoneServcie } from './services/api/zone.service';
import { TransportServcie } from './services/api/transport.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';

import {
  BadgeService,
 
  SupplierService,

} from './services';
import { AccountService } from './services/api/account.service';
import { SaleOrderLineService } from './services/api/sale-order-line.service';
import { DataTableComponent } from './components/data-table/data-table.component';
import { UomService } from './services/api/uom.service';
import { TemplateService } from './services/api/template.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HasPermissionDirective } from './directive/hasPermission.directive';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StockViewService } from './services/api/stock-view.service';
import { WarehouseServcie } from './services/api/warehouse.service';
import { GlobalService } from './services/api/global.service';
import { ProcessService } from './services/api/process.service';
import { FrequencyTypeService } from './services/api/frequency-type.service';
import { ControleTypeService } from './services/api/control-type.service';
import { ControleTypeResponseService } from './services/api/control-type-response.service';
import { ControlePlanService } from './services/api/control-plan.service';
import { NotificationService } from './services/api/notification.service';
import {  ControlValidationService } from './services/api/control-validation.service';
import { ControlState } from './models/control-state';
import { ControleStateService } from './services/api/control-state.service';
import { PlanProductService } from './services/api/plan-product.service';


@NgModule({
  declarations: [DataTableComponent,HasPermissionDirective],
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
    DataTableComponent,NgxPermissionsModule,HasPermissionDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {



      ngModule: SharedModule,
      providers: [
        BadgeService,
      
        SupplierService,
     
        TransportServcie,
        ZoneServcie,
        VatService,
        DeliveryService,
        DeliveryLineService,
        MessageService,
        AccountService,
        SaleOrderService,
        SaleOrderLineService,
        AuthenticationService,
        UserService,
        ConfirmationService,
        AddressService,
      
        ProductTypeService,
        UomService,
        ProductService,
        StockService,
        ProductTypeService,
        PurchaseOrderService,
        ReceptionService,
        OrderTypeService,
        PurchaseOrderLineService,
        PurchaseOrderService,
        ReceptionLineService,
        OrderStatusService,
        ReceptionStockService,   
        MessageService,  
        TemplateService,
        StockViewService,
        WarehouseServcie,
      
        GlobalService,
        ControleTypeService,
        ControleTypeResponseService,
        ProcessService,
        ControlePlanService,
        FrequencyTypeService,
        NotificationService,
        ControlValidationService,
        ControleStateService,
        PlanProductService
      ],

    };
  }
}
