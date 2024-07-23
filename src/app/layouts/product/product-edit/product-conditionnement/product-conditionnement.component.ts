import { Product } from './../../../../shared/models/product';
import { ProductPack } from './../../../../shared/models/ProductPack';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductPackService } from '../../../../shared/services/api/ProductPack.service';
import { ProductService } from '../../../../shared/services/api/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, PrimeNGConfig, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../shared/services/api/global.service';

@Component({
  selector: 'app-product-conditionnement',
  templateUrl: './product-conditionnement.component.html',
  styleUrls: ['./product-conditionnement.component.css']
})
export class ProductConditionnementComponent implements OnInit {
  searchQuery = "";
  @Input() selectedProduct: Product;
  productPackList:Array<ProductPack>=[];
  productPackSelected:Array<ProductPack>=[];
  productPackExportList:Array<ProductPack>=[]
  page = 0;
  size = 10;
  className: string;
  cols: any[];
  collectionSize: number;
  titleList = "Pseudos et conditionnements";
  subscriptions = new Subscription();
  showDialog: boolean = false;
  editMode:number;
  constructor(private productPackService:ProductPackService,
              private productService:ProductService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private confirmationService: ConfirmationService,
              private activateRouter: ActivatedRoute,
              private primengConfig: PrimeNGConfig,
              private messageService: MessageService,
              private globalService: GlobalService) { }

  ngOnInit() {

    this.selectedProduct=this.productService.getProduct();
    this.cols = [
      { field: 'uom',  child :"uomCode", header: 'Unité de mesure', type: 'object' },
      { field: 'alias',child:'eanCode', header: 'Pseudo du produit', type: 'objet' },
      { field: 'owner'  , child :"code" , header: 'Propriétaire', type: 'object' },
      { field: 'salePrice', header: 'Prix de vente', type: 'number' }

    ];
    this.loadData();

    console.log("test alias "+this.selectedProduct.alias);



  }
  loadData(search: string = '') {
    let id =this.selectedProduct?.id==undefined ? 0 : this.selectedProduct.id;
    this.subscriptions.add(this.productPackService.sizeSearch("product.id:" +id).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(
      this.productPackService.findPagination(this.page, this.size, "product.id:" +id).subscribe(
      data => {
        this.productPackList = data;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

        //  this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  onDeleteAll() {

    if (this.productPackSelected.length >= 1) {
      this.confirmationService.confirm({
        message: ' Voulez vous vraiment Supprimer  ?',
        accept: () => {
          const ids = this.productPackSelected.map(x => x.id);
          this.subscriptions.add(this.productPackService.deleteAllByIds(ids).subscribe(
            data => {
              //this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.messageService.add({ severity: 'success', summary: 'Suppression', detail: 'Elément Supprimer avec Succés' });

              this.loadData();
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur' });

              // this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.productPackSelected.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    //  this.searchQuery="this.selectedProduct"
    this.loadData(this.searchQuery);
  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.productPackSelected = event.object;
    if (this.editMode === 3) {
       this.onDeleteAll();
      }
       else {
      this.showDialog = true;
    }

  }
  onExportPdf(event) {
    this.subscriptions.add(
          this.productPackService.find("product.id:" + this.selectedProduct?.id).subscribe(
            (data) => {
              this.productPackSelected = data;
              this.globalService.generatePdf(
                event,
                this.productPackSelected,
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
  onExportExcel(event) {
    this.subscriptions.add(
      this.productPackService.find("product.id:" + this.selectedProduct?.id).subscribe(
        (data) => {
          this.productPackSelected = data;
          this.globalService.generateExcel(
            event,
            this.productPackSelected,
            "Pseudos et conditionnements",
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


  getProductPack(event:ProductPack){
 this.productPackList=this.productPackList.filter(
  (item)=>item !== this.productPackSelected[0]);
  this.productPackList.push(event);
  this.productPackService.setProductPack(this.productPackList);
  console.log(this.productPackList);

  }
  onShowDialog(event) {
    this.showDialog = event;
  }
}
