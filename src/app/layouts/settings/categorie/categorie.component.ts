import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { GlobalService } from "./../../../shared/services/api/global.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { ClientCategory } from "./../../../shared/models/";
import { ClientCategoryService } from "./../../../shared/services/api/client-category.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categorie",
  templateUrl: "./categorie.component.html",
  styleUrls: ["./categorie.component.css"],
})
export class CategorieComponent implements OnInit {
  codeSearch: ClientCategory;
  clientCategoryDescSearch: string;
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  clientCategoryList: Array<ClientCategory> = [];
  collectionSize: number;
  titleList = "Catégorie Client";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  selectedClientCategories: Array<ClientCategory> = [];
  codeList: Array<ClientCategory> = [];
  clientCategoryExportList: Array<ClientCategory> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private clientCategoryService: ClientCategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.className = ClientCategory.name;
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
        this.clientCategoryService
          .size()
          .subscribe((data) => (this.collectionSize = data))
      );
      this.subscriptions.add(
        this.clientCategoryService
          .findAllPagination(this.page, this.size)
          .subscribe(
            (data) => {
              this.clientCategoryList = data;
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
        this.clientCategoryService
          .sizeSearch(this.searchQuery)
          .subscribe((data) => {
            this.collectionSize = data;
          })
      );

      this.subscriptions.add(
        this.clientCategoryService
          .findPagination(this.page, this.collectionSize, this.searchQuery)
          .subscribe(
            (data) => {
              this.clientCategoryList = data;
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
    this.clientCategoryDescSearch = null;
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
      this.clientCategoryDescSearch != null &&
      this.clientCategoryDescSearch !== ""
    ) {
      buffer.append(`description~${this.clientCategoryDescSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }
  onObjectEdited(event: EmittedOBject) {
    this.selectedClientCategories = event.object;
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
        this.clientCategoryService.find(this.searchQuery).subscribe(
          (data) => {
            this.clientCategoryExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.clientCategoryExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.clientCategoryExportList,
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
        this.clientCategoryService.findAll().subscribe(
          (data) => {
            this.clientCategoryExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.clientCategoryExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.clientCategoryExportList,
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
        this.clientCategoryService.find(this.searchQuery).subscribe(
          (data) => {
            this.clientCategoryExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.clientCategoryExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.clientCategoryExportList,
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
        this.clientCategoryService.findAll().subscribe(
          (data) => {
            this.clientCategoryExportList = data;
            if (event != null) {
              this.globalService.generatePdf(
                event,
                this.clientCategoryExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generatePdf(
                this.cols,
                this.clientCategoryExportList,
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
    if (this.selectedClientCategories.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedClientCategories.map((x) => x.id);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.clientCategoryService.delete(id).subscribe(
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
      this.clientCategoryService
        .find("code~" + event.query)
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
    this.showDialog = event;
    this.loadData();
  }
}
