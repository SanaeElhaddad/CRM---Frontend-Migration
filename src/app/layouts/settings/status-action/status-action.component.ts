import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { ActionStatusService } from "../../../shared/services/api/action-status.service";

import { MessageService } from "primeng/api";
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
  selectedActionStatus = new StatusAction();

  constructor(
    private spinner: NgxSpinnerService,
    private actionStatusService: ActionStatusService,
    private messageService: MessageService
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
      this.actionStatusService.findAll().subscribe(
        (data) => {
          this.statusActionList = data;
          this.spinner.hide();
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
  onSearchClicked() {}
  onObjectEdited(event: EmittedOBject) {
    if (event.operationMode == 1) {
      this.showDialog = true;
      this.editMode = 1;
    } else if (event.operationMode == 2) {
      this.selectedActionStatus = event.object[0];
      this.showDialog = true;
    }
  }
  loadDataLazy(event) {}
  onExportExcel(event) {}
  onExportPdf(event) {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onShowDialog(event) {
    this.showDialog = event;
  }
}
