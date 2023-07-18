import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { StatusAction } from "../../../shared/models";


@Component({
  selector: "app-status-action",
  templateUrl: "./status-action.component.html",
  styleUrls: ["./status-action.component.css"],
})
export class StatusActionComponent implements OnInit {
  codeSearch: string;
  StatutDescSearch: string;
  codeStatutActionList: string[];
  searchQuery = "";
  page = 0;
  size = 10;
  className: string;
  cols: any[];
  statusActionList: Array<StatusAction> = [];
  collectionSize: number;
  titleList = "Statut action";
  showDialog: boolean;
  subscriptions = new Subscription();

  constructor(
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onNameSearch(event: any) {}

  loadData(search: string = "") {
    this.spinner.show();
  }

  reset() {
    this.codeSearch = null;
    this.StatutDescSearch = null;
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  onSearchClicked() {}
  onObjectEdited(event) {}
  loadDataLazy(event) {}
  onExportExcel(event) {}
  onExportPdf(event) {}
}
