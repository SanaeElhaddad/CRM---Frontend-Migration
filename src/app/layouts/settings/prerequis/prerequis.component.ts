import { GlobalService } from "./../../../shared/services/api/global.service";
import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { PrerequisteTypeService } from "./../../../shared/services/api/prerequiste-type.service";
import { Subscription } from "rxjs";
import { PrerequisiteType } from "./../../../shared/models/PrerequisiteType";
import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-prerequis",
  templateUrl: "./prerequis.component.html",
  styleUrls: ["./prerequis.component.css"],
})
export class PrerequisComponent implements OnInit {
  codeSearch: PrerequisiteType;
  prerequisiteTypeDescSearch: string;
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  prerequisiteTypeList: Array<PrerequisiteType> = [];
  collectionSize: number;
  titleList = "Type prérequis";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  selectedPrerequisiteTypes: Array<PrerequisiteType> = [];
  codeList: Array<PrerequisiteType> = [];
  PrerequisiteTypeExportList: Array<PrerequisiteType> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private prerequisteTypeService: PrerequisteTypeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.className = PrerequisiteType.name;
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
        this.prerequisteTypeService
          .size()
          .subscribe((data) => (this.collectionSize = data))
      );
      this.subscriptions.add(
        this.prerequisteTypeService .findAllPagination(this.page, this.size).subscribe(
          (data) => {
            this.prerequisiteTypeList = data;
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
        this.prerequisteTypeService
          .sizeSearch(this.searchQuery)
          .subscribe((data) => {
            this.collectionSize = data;
          })
      );

      this.subscriptions.add(
        this.prerequisteTypeService
          .findPagination(this.page, this.collectionSize, this.searchQuery)
          .subscribe(
            (data) => {
              this.prerequisiteTypeList = data;
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
    this.prerequisiteTypeDescSearch = null;
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
      this.prerequisiteTypeDescSearch != null &&
      this.prerequisiteTypeDescSearch !== ""
    ) {
      buffer.append(`description~${this.prerequisiteTypeDescSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }
  onObjectEdited(event: EmittedOBject) {
    this.selectedPrerequisiteTypes = event.object;
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
        this.prerequisteTypeService.find(this.searchQuery).subscribe(
          (data) => {
            this.PrerequisiteTypeExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.PrerequisiteTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.PrerequisiteTypeExportList,
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
        this.prerequisteTypeService.findAll().subscribe(
          (data) => {
            this.PrerequisiteTypeExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.PrerequisiteTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.PrerequisiteTypeExportList,
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
        this.prerequisteTypeService.find(this.searchQuery).subscribe(
          (data) => {
            this.PrerequisiteTypeExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.PrerequisiteTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.PrerequisiteTypeExportList,
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
        this.prerequisteTypeService.findAll().subscribe(
          (data) => {
            this.PrerequisiteTypeExportList = data;
            if (event != null) {
              this.globalService.generatePdf(
                event,
                this.PrerequisiteTypeExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generatePdf(
                this.cols,
                this.PrerequisiteTypeExportList,
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
    if (this.selectedPrerequisiteTypes.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedPrerequisiteTypes.map((x) => x.id);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.prerequisteTypeService.delete(id).subscribe(
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
      this.prerequisteTypeService
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
