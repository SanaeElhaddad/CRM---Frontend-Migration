import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { ActionStatusService } from "../../../shared/services/api/action-status.service";

import { ConfirmationService, MessageService } from "primeng/api";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";

import { StatusAction } from "../../../shared/models";


@Component({
  selector: "app-status-action",
  templateUrl: "./status-action.component.html",
  styleUrls: ["./status-action.component.css"],
})
export class StatusActionComponent implements OnInit, OnDestroy {
  codeSearch: string;
  StatutDescSearch: string;
  codeStatutActionList: string[];
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  statusActionList: Array<StatusAction> = [];
  collectionSize: number;
  titleList = "Statut action";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  selectedActionStatus: Array<StatusAction> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private actionStatusService: ActionStatusService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.className = StatusAction.name;
    this.cols = [
      { field: "statusActionCode", header: "Code", type: "string" },

      {
        field: "statusActionDescription",
        header: "Description",
        type: "string",
      },
    ];

    this.loadData();
  }

  onNameSearch(event: any) {}

  loadData(search: string = "") {
    this.spinner.show();

    this.subscriptions.add(
      this.actionStatusService
        .sizeSearch(this.searchQuery)
        .subscribe((data) => (this.collectionSize = data))
    );

    this.subscriptions.add(
      this.actionStatusService .findAllPagination(this.page, this.size).subscribe(
        (data) => {
          this.statusActionList = data;
          this.spinner.hide();
          console.log(data);
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: JSON.stringify(error),
          });
        }
      )
    );
  }

  reset() {
    this.codeSearch = null;
    this.StatutDescSearch = null;
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  onSearchClicked() {

  }
  onObjectEdited(event: EmittedOBject) {
    if (event.operationMode === 1) {
      this.showDialog = true;
      this.editMode = 1;
    } else if (event.operationMode === 2) {
      this.selectedActionStatus = event.object[0];

      this.showDialog = true;
    } else if (event.operationMode === 3) {
      this.selectedActionStatus = event.object;
      this.deleteAll();
    }
  }
  loadDataLazy(event) {}
  onExportExcel(event) {}
  onExportPdf(event) {}

  deleteAll() {
    if (this.selectedActionStatus.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedActionStatus.map((x) => x.statusActionId);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.actionStatusService.delete(id).subscribe(
                (data) => {
                  this.messageService.add({
                    severity: "success",
                    summary: "Suppression",
                    detail: "Elément Supprimer avec Succés",
                  });
                  this.loadData();
                },
                (error) => {
                  this.messageService.add({
                    severity: "error",
                    summary: "Erreur",
                    detail: JSON.stringify(error),
                  });
                  this.spinner.hide();
                },
                () => {
                  this.spinner.hide();
                }
              );
            })
          );
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }
}
