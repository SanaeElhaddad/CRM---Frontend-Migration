import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../shared/models/product';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuItem, PrimeNGConfig, ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProductPriceByZone } from '../../../../shared/models/ProductPriceByZone';
import { ProductPriceByZoneServiceService } from '../../../../shared/services/api/product-price-by-zone-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../shared/services/api/product.service';
import { GlobalService } from '../../../../shared/services/api/global.service';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent implements OnInit {
 productByZoneListEdited  :ProductPriceByZone[];
  @Input() selectedProduct: Product;

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  cols: any[];
  productByZoneList: Array<ProductPriceByZone> = [];
  productByZoneEdited: ProductPriceByZone;

  selectedProductPriceByZone: Array<ProductPriceByZone> = [];
  editMode: number;
  className: string;
  productPriceByZoneExportList: Array<ProductPriceByZone> = [];
  titleList = "Prix de produit par zone";
  showDialog: boolean = false;
  subscriptions = new Subscription();
  updateBtnDisable: boolean;

  constructor(
    private productPriceByZoneService: ProductPriceByZoneServiceService,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private activateRouter: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private globalService:GlobalService
  ) { }

  ngOnInit() {

 this.selectedProduct=this.productService.getProduct();
    this.primengConfig.ripple = true;
    this.className = "Prix de produit par zone";
    this.cols = [
      { field: 'zone', child: "zoneCode", header: 'Zone', type: 'object' },
      { field: 'retailPrice', header: 'Prix de vente PARTENAIREN1', type: 'number' },
      { field: 'wholeSalePrice', header: 'Prix de vente PARTENAIREN2', type: 'number' },
      { field: 'semiWholeSalePrice', header: 'Prix de vente PARTENAIREN3', type: 'number' },

    ];
    this.loadData();


  }
  loadData(search: string = '') {
    //this.spinner.show();
    console.log("test loadData ");
  let id =this.selectedProduct?.id==undefined ? 0 : this.selectedProduct.id;
    this.subscriptions.add(this.productPriceByZoneService.sizeSearch("product.id:" +id).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(
      this.productPriceByZoneService.findPagination(this.page, this.size, "product.id:" +id).subscribe(
      data => {
        this.productByZoneList = data;
        this.spinner.hide();
       // this.productPriceByZoneService.set(this.productByZoneList)
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

        //  this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    // this.searchQuery="this.selectedProduct"
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
console.log("ggg");


          const ids = this.selectedProductPriceByZone.map(x => x.id);
          console.log(ids);

          this.subscriptions.add(this.productPriceByZoneService.deleteAllByIds(ids).subscribe(
            data => {
              console.log("deleted");

              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.messageService.add({ severity: 'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés' });

              this.loadData();
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

               this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));

    } else if (this.selectedProductPriceByZone.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }

    }


  onExportExcel(event) {
    this.subscriptions.add(
      this.productPriceByZoneService.find("product.id:" + this.selectedProduct?.id).subscribe(
        (data) => {
          this.selectedProductPriceByZone = data;
          this.globalService.generateExcel(
            event,
            this.selectedProductPriceByZone,
            "Prix de produit par zone",
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
  onExportPdf(event) {
    this.subscriptions.add(
      this.productPriceByZoneService.find("product.id:" + this.selectedProduct?.id).subscribe(
        (data) => {
          this.selectedProductPriceByZone = data;
          this.globalService.generatePdf(
            event,
            this.selectedProductPriceByZone,
            "Prix de produit par zone",
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

  getProductPriceByZone(event:ProductPriceByZone){
     this.productByZoneList=this.productByZoneList.filter(
       (item)=>item !== this.selectedProductPriceByZone[0]);

       this.productByZoneList.push(event);
    this.productPriceByZoneService.setProductPriceByZone( this.productByZoneList);

  }
  onShowDialog(event) {
    this.showDialog = event;

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
