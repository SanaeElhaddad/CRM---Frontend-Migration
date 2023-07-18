import { RouterModule } from "@angular/router";
import { MultiSelectModule } from "primeng/multiselect";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { NgxSpinnerModule } from "ngx-spinner";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "./../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TableModule, TableHeaderCheckbox, TableCheckbox } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { KeyFilterModule } from "primeng/keyfilter";

import { SettingsRoutingModule } from "./settings-routing.module";

import { SettingsComponent } from "./settings.component";

import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ContextMenuModule } from "primeng/contextmenu";
import { CheckboxModule } from "primeng/checkbox";

import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { PanelModule } from "primeng/panel";

import { SplitButtonModule } from "primeng/splitbutton";
import { DialogModule } from "primeng/dialog";
import { PaginatorModule } from "primeng/paginator";

import { FieldsetModule } from "primeng/fieldset";

import { InputNumberModule } from "primeng/inputnumber";
import { ProgressBarModule } from "primeng/progressbar";
import { EditorModule } from "primeng/editor";
import { NgxPermissionsModule } from "ngx-permissions";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ToastModule } from "primeng/toast";

import { RadioButtonModule } from "primeng/radiobutton";
import { SelectButtonModule } from "primeng/selectbutton";
import { AccordionModule, AccordionTab } from "primeng/accordion";
import { NgxPrintModule } from "ngx-print";
import { GeneralComponent } from "./general/general.component";

import { StatusTicketComponent } from "./status-ticket/status-ticket.component";
import { OrganisationComponent } from "./organisation/organisation.component";
import { StatusActionComponent } from "./status-action/status-action.component";
import { StatusCompteComponent } from "./status-compte/status-compte.component";
import { StatusDevisComponent } from "./status-devis/status-devis.component";
import { UniteMesureComponent } from "./unite-mesure/unite-mesure.component";
import { SecteurActiviteComponent } from "./secteur-activite/secteur-activite.component";
import { StatusOpportuniteComponent } from "./status-opportunite/status-opportunite.component";
import { ParametreComponent } from "./parametre/parametre.component";
import { CategorieComponent } from "./categorie/categorie.component";
import { PrerequisComponent } from "./prerequis/prerequis.component";
import { HabilitationComponent } from "./habilitation/habilitation.component";
import { FileUploadModule } from "primeng/fileupload";
import { ProductTypeComponent } from "./product-type/product-type.component";
import { ProductTypeEditComponent } from "./product-type/product-type-edit/product-type-edit.component";

@NgModule({
  declarations: [
    SettingsComponent,
    GeneralComponent,
    OrganisationComponent,
    StatusActionComponent,
    StatusCompteComponent,
    StatusDevisComponent,
    UniteMesureComponent,
    StatusTicketComponent,
    SecteurActiviteComponent,
    StatusOpportuniteComponent,
    ParametreComponent,
    CategorieComponent,
    PrerequisComponent,
    HabilitationComponent,
    ProductTypeComponent,
    ProductTypeEditComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
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
    NgxPermissionsModule.forChild()
  ],
})
export class SettingsModule {}
