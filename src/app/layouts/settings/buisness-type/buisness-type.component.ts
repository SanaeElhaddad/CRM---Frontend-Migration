import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { GlobalService } from "./../../../shared/services/api/global.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { BusinessTypeService } from "./../../../shared/services/api/business-type.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { BusinessType } from "./../../../shared/models/";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-buisness-type",
  templateUrl: "./buisness-type.component.html",
  styleUrls: ["./buisness-type.component.css"],
})
export class BuisnessTypeComponent implements OnInit {
  codeSearch: BusinessType;
  businessTypeDescSearch: string;
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  businessTypeList: Array<BusinessType> = [];
  collectionSize: number;
  titleList = "Type d'affaire";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  selectedBusinessTypes: Array<BusinessType> = [];
  codeList: Array<BusinessType> = [];
  businessTypeExportList: Array<BusinessType> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private businessTypeService: BusinessTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.className = BusinessType.name;
    this.cols = [
      { field: "code", header: "Code", type: "string" },

      {
        field: "description",
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
        this.businessTypeService
          .size()
          .subscribe((data) => (this.collectionSize = data))
      );
      this.subscriptions.add(
        this.businessTypeService.findAll().subscribe(
          (data) => {
            this.businessTypeList = data;
            this.spinner.hide();
            console.log(data);
          },
          (error) => {
            this.spinner.hide();
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail: "Erreur",
            });
          }
        )
      );
    } else {
      this.subscriptions.add(
        this.businessTypeService
          .sizeSearch(this.searchQuery)
          .subscribe((data) => {
            this.collectionSize = data;
          })
      );

      this.subscriptions.add(
        this.businessTypeService
          .findPagination(this.page, this.collectionSize, this.searchQuery)
          .subscribe(
            (data) => {
              this.businessTypeList = data;
              this.spinner.hide();
              console.log(data);
            },
            (error) => {
              this.spinner.hide();
              this.messageService.add({
                severity: "error",
                summary: "Erreur",
                detail: "Erreur",
              });
            }
          )
      );
    }
  }

  reset() {
    this.codeSearch = null;
    this.businessTypeDescSearch = null;
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.code !== "") {
      buffer.append(`code~${this.codeSearch.code}`);
    }
    if (
      this.businessTypeDescSearch != null &&
      this.businessTypeDescSearch !== ""
    ) {
      buffer.append(`description~${this.businessTypeDescSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }
  onObjectEdited(event: EmittedOBject) {
    this.selectedBusinessTypes = event.object;
    this.editMode = event.operationMode;
    if (event.operationMode === 3) {
      this.deleteAll();
    } else {
      this.showDialog = true;
    }
  }
  loadDataLazy(event) {}
  onExportExcel(event) {
    if (this.searchQuery !== "") {
      this.subscriptions.add(
        this.businessTypeService.find(this.searchQuery).subscribe(
          (data) => {
            this.businessTypeExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.businessTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.businessTypeExportList,
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
        this.businessTypeService.findAll().subscribe(
          (data) => {
            this.businessTypeExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.businessTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.businessTypeExportList,
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
        this.businessTypeService.find(this.searchQuery).subscribe(
          (data) => {
            this.businessTypeExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.businessTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.businessTypeExportList,
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
        this.businessTypeService.findAll().subscribe(
          (data) => {
            this.businessTypeExportList = data;
            if (event != null) {
              this.globalService.generatePdf(
                event,
                this.businessTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generatePdf(
                this.cols,
                this.businessTypeExportList,
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

  deleteAll() {
    if (this.selectedBusinessTypes.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedBusinessTypes.map((x) => x.id);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.businessTypeService.delete(id).subscribe(
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
      this.businessTypeService.find("code~" + event.query).subscribe((data) => {
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
