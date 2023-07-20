import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductTypeService } from './../../../shared/services/api/product-type.service';
import { Subscription } from 'rxjs';
import { ProductType } from './../../../shared/models/ProductType';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch = '';
  codeList: Array<ProductType> = [];
  cols: any[];
  productTypeList: Array<ProductType> = [];
  selectedProductTypes: Array<ProductType> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  titleList = 'Liste des types de frequence';
  productTypeExportList: Array<ProductType> = [];
  subscriptions= new Subscription();
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;
  constructor(private productTypeService: ProductTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.itemsBreadcrumb = [
      { label: 'Paramétrage' },
      { label: 'Type de Produit', routerLink: '/core/settings/frequency-type' },

    ];
    this.homeBreadcrumb = { icon: 'pi pi-home' };
    this.primengConfig.ripple = true;
    this.className = ProductType.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

    this.loadData();

  }
  
  // onExportExcel(event) {

  //   this.subscriptions.add(this.productTypeService.find(this.searchQuery).subscribe(
  //     data => {
  //       this.productTypeExportList = data;
  //       if (event != null) {
  //         this.globalService.generateExcel(event, this.productTypeExportList, this.className, this.titleList);
  //       } else {
  //         this.globalService.generateExcel(this.cols, this.productTypeExportList, this.className, this.titleList);

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
  //   this.subscriptions.add(this.productTypeService.find(this.searchQuery).subscribe(
  //     data => {
  //       this.productTypeExportList = data;
  //       this.globalService.generatePdf(event, this.productTypeExportList, this.className, this.titleList);
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
    this.subscriptions.add(this.productTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.productTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        
        this.productTypeList = data;

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
    if (this.descriptionSearch != null && this.descriptionSearch !== '') {
      buffer.append(`description~${this.descriptionSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.subscriptions.add(this.productTypeService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }
  reset() {
    this.codeSearch = null;
    this.descriptionSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedProductTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedProductTypes.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedProductTypes.map(x => x.id);
          this.subscriptions.add(this.productTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedProductTypes.length < 1) {
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
