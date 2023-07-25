import { Privilege } from "./../../../shared/models/Privilege";
import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { GlobalService } from "./../../../shared/services/api/global.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { HabilitationService } from "./../../../shared/services/api/habilitation.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-habilitation",
  templateUrl: "./habilitation.component.html",
  styleUrls: ["./habilitation.component.css"],
})
export class HabilitationComponent implements OnInit {
  codeSearch: Privilege;
  habilitationDescSearch: string;
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  habilitationList: Array<Privilege> = [];
  collectionSize: number;
  titleList = "Habilitation";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  selectedHabilitations: Array<Privilege> = [];
  codeList: Array<Privilege> = [];
  habilitationExportList: Array<Privilege> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private habilitationService: HabilitationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.className = Privilege.name;
    this.cols = [
      { field: "prvCode", header: "Code", type: "string" },

      {
        field: "prvDescription",
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
        this.habilitationService
          .size()
          .subscribe((data) => (this.collectionSize = data))
      );
      this.subscriptions.add(
        this.habilitationService.findAll().subscribe(
          (data) => {
            this.habilitationList = data;
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
        this.habilitationService
          .sizeSearch(this.searchQuery)
          .subscribe((data) => {
            this.collectionSize = data;
          })
      );

      this.subscriptions.add(
        this.habilitationService
          .findPagination(this.page, this.collectionSize, this.searchQuery)
          .subscribe(
            (data) => {
              this.habilitationList = data;
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
    this.habilitationDescSearch = null;
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.prvCode !== "") {
      buffer.append(`prvCode~${this.codeSearch.prvDescription}`);
    }
    if (
      this.habilitationDescSearch != null &&
      this.habilitationDescSearch !== ""
    ) {
      buffer.append(`prvDescription~${this.habilitationDescSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }
  onObjectEdited(event: EmittedOBject) {
    this.selectedHabilitations = event.object;

    this.editMode = event.operationMode;
    console.log(this.editMode);

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
        this.habilitationService.find(this.searchQuery).subscribe(
          (data) => {
            this.habilitationExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.habilitationExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.habilitationExportList,
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
        this.habilitationService.findAll().subscribe(
          (data) => {
            this.habilitationExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.habilitationExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.habilitationExportList,
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
        this.habilitationService.find(this.searchQuery).subscribe(
          (data) => {
            this.habilitationExportList = data;
            if (event != null) {
              this.globalService.generateExcel(
                event,
                this.habilitationExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generateExcel(
                this.cols,
                this.habilitationExportList,
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
        this.habilitationService.findAll().subscribe(
          (data) => {
            this.habilitationExportList = data;
            if (event != null) {
              this.globalService.generatePdf(
                event,
                this.habilitationExportList,
                this.className,
                this.titleList
              );
            } else {
              this.globalService.generatePdf(
                this.cols,
                this.habilitationExportList,
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
    if (this.selectedHabilitations.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedHabilitations.map((x) => x.prvId);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.habilitationService.delete(id).subscribe(
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
                  console.log(JSON.stringify(error));

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
      this.habilitationService
        .find("prvCode~" + event.query)
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
