import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationComponent } from './relation.component';
import { ClientComponent } from './client/client.component';
import { GroupeContactComponent } from './groupe-contact/groupe-contact.component';
import { CompagnieComponent } from './compagnie/compagnie.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { ContratComponent } from './contrat/contrat.component';
import { ContactComponent } from './contact/contact.component';
import { ClientsComponent } from './clients/clients.component';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import { RelationRoutingModule } from './relation-routing.module';
import { SharedModule } from "../../shared/shared.module";
import {ToastModule} from 'primeng/toast';
import { NgxSpinnerModule } from "ngx-spinner";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from "primeng/breadcrumb";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {DialogModule} from 'primeng/dialog';


@NgModule({
    declarations: [RelationComponent, ClientsComponent, ContactComponent, ContratComponent, PartenaireComponent, CompagnieComponent, GroupeContactComponent, ClientComponent,
    ],
    imports: [
        CommonModule, TabViewModule, PanelModule, RelationRoutingModule,
        SharedModule,ToastModule, NgxSpinnerModule,ConfirmDialogModule,BreadcrumbModule,
        AutoCompleteModule,TranslateModule,FormsModule,ReactiveFormsModule,DialogModule

    ]
})
export class RelationModule { }
