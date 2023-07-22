import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { ActivityAreaService } from "./../../../shared/services/api/activity-area.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { ActivityArea } from "./../../../shared/models";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-secteur-activite",
  templateUrl: "./secteur-activite.component.html",
  styleUrls: ["./secteur-activite.component.css"],
})
export class SecteurActiviteComponent implements OnInit {
  codeSearch: ActivityArea;
  activityAreaDescSearch: string;
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  activityAreaList: Array<ActivityArea> = [];
  collectionSize: number;
  titleList = "Secteur d'activité";
  showDialogActivityArea: boolean = false;
  subscriptions = new Subscription();
  selectedactivityAreas: Array<ActivityArea> = [];
  codeList: Array<ActivityArea> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private activityAreaService: ActivityAreaService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.className = ActivityArea.name;
    this.cols = [
      { field: "activityAreaCode", header: "Code", type: "string" },

      {
        field: "activityAreaDescription",
        header: "Description",
        type: "string",
      },
    ];

    this.loadData();
  }

  loadData() {
    this.spinner.show();
    if (this.searchQuery === "") {
      this.subscriptions.add(
        this.activityAreaService
          .size()
          .subscribe((data) => (this.collectionSize = data))
      );
      this.subscriptions.add(
        this.activityAreaService.findAll().subscribe(
          (data) => {
            this.activityAreaList = data;
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
    } else {
      this.subscriptions.add(
        this.activityAreaService
          .sizeSearch(this.searchQuery)
          .subscribe((data) => {
            this.collectionSize = data;
          })
      );

      this.subscriptions.add(
        this.activityAreaService
          .findPagination(this.page, this.collectionSize, this.searchQuery)
          .subscribe(
            (data) => {
              this.activityAreaList = data;
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
  }

  reset() {
    this.codeSearch = null;
    this.activityAreaDescSearch = null;
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.activityAreaCode !== "") {
      buffer.append(`activityAreaCode~${this.codeSearch.activityAreaCode}`);
    }
    if (
      this.activityAreaDescSearch != null &&
      this.activityAreaDescSearch !== ""
    ) {
      buffer.append(`activityAreaDescSearch~${this.activityAreaDescSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }
  onObjectEdited(event: EmittedOBject) {
    this.selectedactivityAreas = event.object;
    this.editMode = event.operationMode;
    if (event.operationMode === 3) {
      this.deleteAll();
    } else {
      this.showDialogActivityArea = true;
    }
  }
  loadDataLazy(event) {}
  onExportExcel(event) {}
  onExportPdf(event) {}

  deleteAll() {
    if (this.selectedactivityAreas.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedactivityAreas.map((x) => x.activityAreaId);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.activityAreaService.delete(id).subscribe(
                (data) => {
                  this.messageService.add({
                    severity: "success",
                    summary: "Suppression",
                    detail: "Elément Supprimer avec Succés",
                  });
                    this.confirmationService.close();

                  this.loadData();
                },
                (error) => {
                  this.messageService.add({
                    severity: "error",
                    summary: "Erreur",
                    detail: "Erreur",
                  });
                  this.confirmationService.close();

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

  onCodeSearch(event: any) {
    this.subscriptions.add(
      this.activityAreaService
        .find("activityAreaCode~" + event.query)
        .subscribe((data) => {
          console.log(data);
          this.codeList = data;
          console.log(this.codeList);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onShowDialog(event) {
    this.showDialogActivityArea = event;
    this.loadData();
  }
}
