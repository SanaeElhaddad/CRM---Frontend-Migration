import { ProductTypeService } from './../../../shared/services/api/product-type.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductType } from '../../../shared/models/ProductType';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/api/product.service';
import { EmsBuffer } from '../../../shared/utils/ems-buffer';
import { ProxyService } from '../../../shared/services/api/proxy.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  codeSearch: Product;
  ProductTypeSearch: ProductType;
  ProductTypeList: Array<ProductType> = [];
  selectProducts: Array<Product> = [];
  productList: Product[];
  codesuppplierList: Array<Product> = [];
  cols: any[];
  showDialog: boolean;
  editMode: number;
  className: string;
  productExportList: Array<Product> = [];
  titleList = 'Liste des Produits';
  subscriptions = new Subscription();
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  selectedProduct: Product= new Product();
  constructor(

    private productService:ProductService,
    private productTypeService:ProductTypeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }


  ngOnInit() {
    this.productService.findAll().subscribe(data =>{
      this.productList = data;
      console.log(  this.productList );

    } );
  //   this.sortOptions = [
  //     {label: 'Price High to Low', value: '!price'},
  //     {label: 'Price Low to High', value: 'price'}
  // ];

    this.itemsBreadcrumb = [
      { label: ' Produit' },
      { label: 'Lister', routerLink: '/core/product' },

    ];
    this.homeBreadcrumb = { icon: 'pi pi-home' };
    this.className = Product.name;
    this.loadData();



  }

  loadData(search: string = '') {


    this.spinner.show();
    this.subscriptions.add( this.productService.sizeSearch(this.searchQuery).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.productService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.productList = data;

        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       //this.toastr.error('Erreur de connexion');
      },
      () => this.spinner.hide()
    ));
  }

  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }
  onNameSearch(event: any) {
    this.subscriptions.add(this.productService.find('code~' + event.query).subscribe(
      data => this.codesuppplierList = data
    ));
  }
  oncodeProductTypeSearch(event: any) {
    this.subscriptions.add(this.productTypeService.find('code~' + event.query).subscribe(
      data => this.ProductTypeList = data
    ));
  }
  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.code !== '') {
      buffer.append(`code~${this.codeSearch.code}`);
    }
    if (this.ProductTypeSearch != null && this.ProductTypeSearch.code !== '') {
      buffer.append(`productType.code~${this.ProductTypeSearch.code}`);
    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.ProductTypeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }



  getSelectProduct(event){
    console.log(event);
    this.selectedProduct= event;
    this.showDialog = true;
  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
