import { InputTextModule } from "primeng/inputtext";
import { FieldsetModule } from "primeng/fieldset";
import { SharedModule } from "./../../shared/shared.module";
import { CheckboxModule } from "primeng/checkbox";
import { ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TranslateModule } from "@ngx-translate/core";
import { PanelModule } from "primeng/panel";
import { TabViewModule } from "primeng/tabview";
import { DevisRoutingModule } from "./devis-routing.module";
import { DevisComponent } from "./devis.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DevisEditComponent } from "./devis-edit/devis-edit.component";
import { DevisListComponent } from "./devis-list/devis-list.component";
import { DevisLineListComponent } from "./devis-line-list/devis-line-list.component";
import { DevisMenuComponent } from "../devis-menu/devis-menu.component";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";

@NgModule({
  declarations: [
    DevisComponent,
    DevisEditComponent,
    DevisListComponent,
    DevisLineListComponent,
    DevisMenuComponent,
  ],
  imports: [
    CommonModule,
    DevisRoutingModule,
    InputTextareaModule,
    TabViewModule,
    PanelModule,
    BreadcrumbModule,
    TranslateModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule,
    SharedModule,
    FieldsetModule,
    InputTextModule,
  ],
})
export class DevisModule {}
