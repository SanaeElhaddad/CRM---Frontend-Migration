import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Account } from './../../../shared/models/accounts';
import { ClientService } from './../../../shared/services/api/client.service';

import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  NameSearch = '';
  codeList: Array<Account> = [];
  cols: any[];
  clientCategoryList: Array<Account> = [];
  selectedaccountss: Array<Account> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Clients';
  accountsExportList: Array<Account> = [];
  subscriptions= new Subscription();
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;
  constructor(private clientService: ClientService,
    //private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.itemsBreadcrumb = [
      { label: 'Paramétrage' },
      { label: 'Clients', routerLink: '/core/relation/clients' },

    ];
    this.homeBreadcrumb = { icon: 'pi pi-home' };
    this.primengConfig.ripple = true;
    this.className = Account.name;
    this.cols = [
      { field: 'accountCode', header: 'Code', type: 'string' },
      { field: 'accountName', header: 'Nom', type: 'string' },
      { field: 'Secteur dactivité', header: 'Secteur dactivité', type: 'string' },
      { field: 'Seuil', header: 'Seuil', type: 'number' },
      { field: 'Commercial', header: 'Commercial', type: 'string' },
      { field: 'Compagnie', header: 'Compagnie', type: 'string' },

    ];

    this.loadData();

  }

  // onExportExcel(event) {

  //   this.subscriptions.add(this.accountsService.find(this.searchQuery).subscribe(
  //     data => {
  //       this.accountsExportList = data;
  //       if (event != null) {
  //         this.globalService.generateExcel(event, this.accountsExportList, this.className, this.titleList);
  //       } else {
  //         this.globalService.generateExcel(this.cols, this.accountsExportList, this.className, this.titleList);

  //       }
  //       this.spinner.hide();
  //     },
  //     error => {
  //       this.spinner.hide();
  //     },
  //     () => this.spinner.hide()
  //   ));


  // }
  // onExportPdf(event) {
  //   this.subscriptions.add(this.accountsService.find(this.searchQuery).subscribe(
  //     data => {
  //       this.accountsExportList = data;
  //       this.globalService.generatePdf(event, this.accountsExportList, this.className, this.titleList);
  //       this.spinner.hide();
  //     },
  //     error => {
  //       this.spinner.hide();
  //     },
  //     () => this.spinner.hide()
  //   ));

  // }
  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.clientService.size().subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.clientService.findAllPagination(this.page, this.size).subscribe(
      data => {
        console.log(data);

        this.clientCategoryList = data;

        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

      //  this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    if (this.NameSearch != null && this.NameSearch !== '') {
      buffer.append(`description~${this.NameSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.clientService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }
  reset() {
    this.codeSearch = null;
    this.NameSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedaccountss = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedaccountss.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedaccountss.map(x => x.accountId);
          this.subscriptions.add(this.clientService.deleteAllByIds(ids).subscribe(
            data => {
              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés'});

              this.loadData();
            },
            error => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

             // this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedaccountss.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {

    this.showDialog = event;

    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
