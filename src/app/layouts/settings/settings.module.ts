import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule, TableHeaderCheckbox, TableCheckbox } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {KeyFilterModule} from 'primeng/keyfilter';

import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './settings.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuModule} from 'primeng/contextmenu';
import {CheckboxModule} from 'primeng/checkbox';


import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {PanelModule} from 'primeng/panel';

import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';

import {FieldsetModule} from 'primeng/fieldset';

import {  InputNumberModule } from 'primeng/inputnumber';
import {ProgressBarModule} from 'primeng/progressbar';
import { EditorModule } from 'primeng/editor';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {ToastModule} from 'primeng/toast';

import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {AccordionModule, AccordionTab} from 'primeng/accordion';
import {NgxPrintModule} from 'ngx-print';




@NgModule({
  declarations: [

    SettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    NgbModalModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    SharedModule,
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
  FieldsetModule,
  InputNumberModule,
  ProgressBarModule,
  EditorModule,
  BreadcrumbModule,
  ToastModule,
  RadioButtonModule,
  SelectButtonModule,
  AccordionModule,
  NgxPrintModule,
  NgxPermissionsModule.forChild(),
  ]
})
export class SettingsModule { }
