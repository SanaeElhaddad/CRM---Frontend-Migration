import { Router } from "@angular/router";
import { EmittedOBject } from "./../../../shared/components/data-table/emitted-object";
import { EmsBuffer } from "./../../../shared/utils/ems-buffer";
import { GlobalService } from "./../../../shared/services/api/global.service";
import { StatusDevis } from "./../../../shared/models/StatusDevis";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { NgxSpinnerService } from "ngx-spinner";
import { DevisStatusService } from "./../../../shared/services/api/devis-status.service";
import { AccountService } from "./../../../shared/services/api/accounts.service";
import { Account } from "./../../../shared/models/accounts";
import { Devis } from "./../../../shared/models/";
import { DevisService } from "./../../../shared/services/api/devis.service";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { map } from "rxjs-compat/operator/map";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-devis-list",
  templateUrl: "./devis-list.component.html",
  styleUrls: ["./devis-list.component.css"],
})
export class DevisListComponent implements OnInit, OnDestroy {
  DevisSearchForm: FormGroup;
  subscriptions = new Subscription();
  codeDevisList: Devis[];
  codeClientList: Account[];
  codestatusDevis: StatusDevis[];
  searchQuery: string;
  size = 10;
  page = 0;
  className: string;
  cols: any[];
  collectionSize: number;
  devisList: Devis[];
  titleList = "Devis";
  editMode: number;
  selectedDevis: Devis[];
  items: MenuItem[];

  home: MenuItem;

  constructor(
    private formBuilder: FormBuilder,
    private devisService: DevisService,
    private accountService: AccountService,
    private devisStatusService: DevisStatusService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.className = Devis.name;
    this.cols = [
      { field: "code", header: "Code", type: "string" },

      {
        field: "account",
        child: "accountCode",
        header: "Client",
        type: "object",
      },
      {
        field: "statusDevis",
        child: "statusDevisCode",
        header: "Statut de devis",
        type: "object",
      },
      {
        field: "version",
        header: "Version",
        type: "number",
      },
      {
        field: "discount",
        header: "Remise",
        type: "number",
      },
      {
        field: "totalPriceHT",
        header: "Prix HT",
        type: "number",
      },
      {
        field: "totalPriceTTC",
        header: "Prix TTC",
        type: "number",
      },
      {
        field: "currency",
        child: "currencyCode",
        header: "Devise",
        type: "object",
      },
    ];
    this.initForm();
    this.loadData();
  }

  loadData(): void {
    this.spinner.show();
    //load Devis status here for p-dropdown
    this.subscriptions.add(
      this.devisStatusService.findAll().subscribe(
        (data) => {
          this.codestatusDevis = data;
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });
        }
      )
    );
    //Load Devis list and collection size here for app-data-table
    if (this.searchQuery !== "") {
      this.subscriptions.add(
        this.devisService.sizeSearch(this.searchQuery).subscribe((data) => {
          this.collectionSize = data;
        })
      );
      this.subscriptions.add(
        this.devisService
          .findPagination(this.page, this.size, this.searchQuery)
          .subscribe(
            (data) => {
              this.devisList = data;
              this.spinner.hide();
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
        this.devisService.size().subscribe((data) => {
          this.collectionSize = data;
        })
      );
      this.subscriptions.add(
        this.devisService.findAllPagination(this.page, this.size).subscribe(
          (data) => {
            this.devisList = data;
            this.spinner.hide();
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

  initForm(): void {
    this.DevisSearchForm = this.formBuilder.group({
      codeDevis: [null],
      statusDevis: [null],
      clientDevis: [null],
      actif: [null],
    });
  }

  onCodeDeviSearch(event) {
    this.subscriptions.add(
      this.devisService.find("code~" + event.query).subscribe(
        (data) => {
          this.codeDevisList = data;
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });
        }
      )
    );
  }

  onCodeClientSearch(event) {
    this.subscriptions.add(
      this.accountService.find("accountCode~" + event.query).subscribe(
        (data) => {
          this.codeClientList = data;
          console.log(data);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erreur",
            detail: "Erreur",
          });
        }
      )
    );
  }
  onSearchClicked(): void {
    const buffer = new EmsBuffer();
    let codeDevis: Devis = this.DevisSearchForm.value["codeDevis"];
    let statusDevis: StatusDevis = this.DevisSearchForm.value["statusDevis"];
    let clientDevis: Account = this.DevisSearchForm.value["clientDevis"];
    let actif: boolean = this.DevisSearchForm.value["actif"];

    if (codeDevis != null && codeDevis.code !== "") {
      buffer.append(`code~${codeDevis.code}`);
    }
    if (statusDevis != null && statusDevis.statusDevisCode !== "") {
      buffer.append(
        `statusDevis.statusDevisCode~${statusDevis.statusDevisCode}`
      );
    }
    if (clientDevis != null && clientDevis.accountCode !== "") {
      buffer.append(`account.accountCode~${clientDevis.accountCode}`);
    }
    if (actif != null) {
      buffer.append(`active:${actif}`);
    }
    console.log(buffer.getValue());

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData();
  }

  onObjectEdited(event: EmittedOBject) {
    this.editMode = event.operationMode;
    this.selectedDevis = event.object;
    if (this.editMode === 3) {
      this.deleteAll();
    } else if (this.editMode === 1) {
      this.router.navigateByUrl("/core/devis/edit");
    } else {
      this.router.navigateByUrl("/core/devis/edit/" + this.selectedDevis[0].id);
    }
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData();
  }
  onExportPdf(event) {}
  onExportExcel(event) {}

  reset() {
    this.DevisSearchForm.reset();
    this.page = 0;
    this.searchQuery = "";
    this.loadData();
  }
  deleteAll() {
    if (this.selectedDevis.length >= 1) {
      this.confirmationService.confirm({
        message: "Voulez vous vraiment Suprimer?",
        accept: () => {
          this.spinner.show();
          const ids = this.selectedDevis.map((x) => x.id);
          this.subscriptions.add(
            ids.forEach((id) => {
              this.devisService.delete(id).subscribe(
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
