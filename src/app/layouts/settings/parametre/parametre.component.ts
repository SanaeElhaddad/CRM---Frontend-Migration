import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { Setting } from "./../../../shared/models/";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService, MessageService } from "primeng/api";
import { SettingsService } from "./../../../shared/services/api/settings.service";
import { GlobalService } from "./../../../shared/services/api/global.service";

@Component({
  selector: "app-parametre",
  templateUrl: "./parametre.component.html",
  styleUrls: ["./parametre.component.css"],
})
export class ParametreComponent implements OnInit {
  codeSearch: Setting;
  settingsValueSearch: string;
  searchQuery = "";
  page = 0;
  size = 10;
  editMode: number;
  className: string;
  cols: any[];
  settingsList: Array<Setting> = [];
  collectionSize: number;
  titleList = "Paramètres";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  selectedSettings: Array<Setting> = [];
  codeList: Array<Setting> = [];
  parametresExportList: Array<Setting> = [];

  constructor(
    private spinner: NgxSpinnerService,
    private settingsService: SettingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.className = Setting.name;
    this.cols = [
      { field: "code", header: "Code", type: "string" },

      {
        field: "value",
        header: "Valeur",
        type: "string",
      },
    ];

    this.loadData();
  }

  loadData() {
    this.spinner.show();

    if (this.searchQuery === "") {
      this.subscriptions.add(
        this.settingsService
          .size()
          .subscribe((data) => (this.collectionSize = data))
      );
      this.subscriptions.add(
        this.settingsService.findAllPagination(this.page, this.size).subscribe(
          (data) => {
            this.settingsList = data;
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
        this.settingsService.sizeSearch(this.searchQuery).subscribe((data) => {
          this.collectionSize = data;
        })
      );

      this.subscriptions.add(
        this.settingsService
          .findPagination(this.page, this.collectionSize, this.searchQuery)
          .subscribe(
            (data) => {
              this.settingsList = data;
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
    this.settingsValueSearch = null;
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.code !== "") {
      buffer.append(`code~${this.codeSearch.code}`);
    }
    if (this.settingsValueSearch != null && this.settingsValueSearch !== "") {
      buffer.append(`value~${this.settingsValueSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }
  onObjectEdited(event: EmittedOBject) {
    this.selectedSettings = event.object;
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
    this.subscriptions.add(
      this.settingsService.find(this.searchQuery).subscribe(
        (data) => {
          this.parametresExportList = data;
          if (event != null) {
            this.globalService.generateExcel(
              event,
              this.parametresExportList,
              this.className,
              this.titleList
            );
          } else {
            this.globalService.generateExcel(
              this.cols,
              this.parametresExportList,
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
  onExportPdf(event) {
    this.subscriptions.add(
      this.settingsService.find(this.searchQuery).subscribe(
        (data) => {
          this.parametresExportList = data;
          this.globalService.generatePdf(
            event,
            this.parametresExportList,
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

  deleteAll() {
    if (this.selectedSettings.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedSettings.map((x) => x.id);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.settingsService.delete(id).subscribe(
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
      this.settingsService.find("code~" + event.query).subscribe((data) => {
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
