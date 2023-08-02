import { Product } from './../../../../../../shared/models/product';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuItem, PrimeNGConfig, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProductPriceByZone } from '../../../../../../shared/models/ProductPriceByZone';
import { ProductPriceByZoneServiceService } from '../../../../../../shared/services/api/product-price-by-zone-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent implements OnInit {

@Input() selectedProduct:Product;
  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  cols: any[];
  productByZoneList: Array<ProductPriceByZone> = [];
  selectedProductPriceByZone: Array<ProductPriceByZone> = [];
  editMode: number;
  className: string;
  productPriceByZoneExportList: Array<ProductPriceByZone> = [];
  titleList = "Prix de produit par zone";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  updateBtnDisable:boolean;
  constructor(
    private productPriceByZoneService:ProductPriceByZoneServiceService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
    ) { }

  ngOnInit() {

    this.primengConfig.ripple = true;
    this.className = "Prix de produit par zone";
    this.cols = [
      { field: 'zone'  , child :"code" , header: 'Zone', type: 'object' },
      { field: 'retailPrice', header: 'Prix de vente PARTENAIREN1', type: 'number' },
      { field: 'wholeSalePrice', header: 'Prix de vente PARTENAIREN2', type: 'number' },
      { field: 'semiWholeSalePrice', header: 'Prix de vente PARTENAIREN3', type: 'number' },

    ];
    console.log(this.selectedProduct);
    this.loadData();


  }
  onShowDialog(event) {
    console.log("cccccc");
    this.showDialog = event;
  }
  loadData(search: string = '') {
    //this.spinner.show();
    this.subscriptions.add(this.productPriceByZoneService.size().subscribe(
      data=> {
        this.collectionSize=data;
      }
    ));
    this.subscriptions.add(this.productPriceByZoneService.findAllPagination(this.page, this.size).subscribe(
      data => {
        console.log(data);

        this.productByZoneList = data;

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
  //  this.searchQuery="this.selectedProduct"
    this.loadData(this.searchQuery);
  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedProductPriceByZone = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }
  onDeleteAll() {

    if (this.selectedProductPriceByZone.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.selectedProductPriceByZone.map(x => x.id);
          this.subscriptions.add(this.productPriceByZoneService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedProductPriceByZone.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }
  reset() {
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
