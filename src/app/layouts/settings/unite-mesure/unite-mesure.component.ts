import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Uom } from "../../../shared/models";
import { UomService } from "../../../shared/services/api/uom.service";
import { GlobalService } from "./../../../shared/services/api/global.service";


@Component({
  selector: "app-unite-mesure",
  templateUrl: "./unite-mesure.component.html",
  styleUrls: ["./unite-mesure.component.css"],
})
export class UniteMesureComponent implements OnInit {
  codeSearch: Uom;
  uomDescSearch: string;
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  uomList: Array<Uom> = [];
  collectionSize: number;
  titleList = "Unité de mesure";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  selectedUoms: Array<Uom> = [];
  codeList: Array<Uom> = [];
  uomExportList: Array<Uom> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private uomService: UomService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.className = Uom.name;
    this.cols = [
      { field: "uomCode", header: "Code", type: "string" },

      {
        field: "uomDescription",
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
        this.uomService.size().subscribe((data) => (this.collectionSize = data))
      );
      this.subscriptions.add(
        this.uomService .findAllPagination(this.page, this.size).subscribe(
          (data) => {
            this.uomList = data;
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
        this.uomService.sizeSearch(this.searchQuery).subscribe((data) => {
          this.collectionSize = data;
        })
      );

      this.subscriptions.add(
        this.uomService
          .findPagination(this.page, this.collectionSize, this.searchQuery)
          .subscribe(
            (data) => {
              this.uomList = data;
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
    this.uomDescSearch = null;
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.uomCode !== "") {
      buffer.append(`uomCode~${this.codeSearch.uomCode}`);
    }
    if (this.uomDescSearch != null && this.uomDescSearch !== "") {
      buffer.append(`uomDescription~${this.uomDescSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }
  onObjectEdited(event: EmittedOBject) {
    this.selectedUoms = event.object;
    this.editMode = event.operationMode;
    if (event.operationMode === 3) {
      this.deleteAll();
    } else {
      this.showDialog = true;
    }
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData();
  }
  onExportExcel(event) {
    if (this.searchQuery !== "") {
      this.subscriptions.add(
        this.uomService.find(this.searchQuery).subscribe(
          (data) => {
            this.uomExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.uomExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.uomExportList,
                this.className,
                this.titleList
              );
            }
            this.spinner.hide();
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail: "Erreur",
            });

            this.spinner.hide();
          },
          () => this.spinner.hide()
        )
      );
    } else {
      this.subscriptions.add(
        this.uomService.findAll().subscribe(
          (data) => {
            this.uomExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.uomExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.uomExportList,
                this.className,
                this.titleList
              );
            }
            this.spinner.hide();
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail: "Erreur",
            });

            this.spinner.hide();
          },
          () => this.spinner.hide()
        )
      );
    }
  }
  onExportPdf(event) {
    if (this.searchQuery !== "") {
      this.subscriptions.add(
        this.uomService.find(this.searchQuery).subscribe(
          (data) => {
            this.uomExportList = data;
            this.globalService.generatePdf(
              event,
              this.uomExportList,
              this.className,
              this.titleList
            );
            this.spinner.hide();
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail: "Erreur",
            });

            this.spinner.hide();
          },
          () => this.spinner.hide()
        )
      );
    } else {
      this.subscriptions.add(
        this.uomService.findAll().subscribe(
          (data) => {
            this.uomExportList = data;
            this.globalService.generatePdf(
              event,
              this.uomExportList,
              this.className,
              this.titleList
            );
            this.spinner.hide();
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail: "Erreur",
            });

            this.spinner.hide();
          },
          () => this.spinner.hide()
        )
      );
    }
  }

  deleteAll() {
    if (this.selectedUoms.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedUoms.map((x) => x.uomId);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.uomService.delete(id).subscribe(
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
                    detail: JSON.stringify(error),
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
      this.uomService.find("uomCode~" + event.query).subscribe((data) => {
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
    this.showDialog = event;
    this.loadData();
  }
}
