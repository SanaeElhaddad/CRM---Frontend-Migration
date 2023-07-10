import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { PlanProduct } from './../../../shared/models/plan-product';
import { GlobalService } from './../../../shared/services/api/global.service';
import { PlanProductService } from './../../../shared/services/api/plan-product.service';
import { EmsBuffer } from './../../../shared/utils';

@Component({
  selector: 'app-plan-product-list',
  templateUrl: './plan-product-list.component.html',
  styleUrls: ['./plan-product-list.component.scss']
})
export class PlanProductListComponent implements OnInit {

  page = 0;
  size = 8;
  collectionSize: number;
  searchQuery = '';
  planProductList: Array<PlanProduct> = [];
  selectPlanProducts: Array<PlanProduct> = [];
  className: string;
  cols: any[];
  editMode: number;
  showDialog: boolean;
  titleList = 'Liste Des Plan Produit';
  planProductcodeSearch: string;
  planProductCodeList: Array<PlanProduct> = [];

  planProductExportList:Array<PlanProduct> = [];
  itemsBreadcrumb: MenuItem[];
  homeBreadcrumb: MenuItem;
  constructor(
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private planProductService: PlanProductService,
    private globalService: GlobalService,

    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.itemsBreadcrumb = [
      { label: 'Plan Produit' },
      { label: 'Lister', routerLink: '/core/plan-product/list' },

    ];
    this.homeBreadcrumb = { icon: 'pi pi-home' };

    this.className = PlanProduct.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

  

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectPlanProducts = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/plan-product/edit', this.selectPlanProducts[0].id]);


    }

  }


  onExportExcel(event) {

    this.planProductService.find(this.searchQuery).subscribe(
      data => {
        this.planProductExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.planProductExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.planProductExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }


  onExportPdf(event) {
    this.planProductService.find(this.searchQuery).subscribe(
      data => {
        this.planProductExportList = data;
        this.globalService.generatePdf(event, this.planProductExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  loadData(search: string = '') {

    this.spinner.show();
    this.planProductService.sizeSearch(search).subscribe(
      data => {

        this.collectionSize = data;
      }
    );

    this.planProductService.findPagination(this.page, this.size, search).subscribe(
      data => {

        this.planProductList = data;
console.log(this.planProductList);

        this.spinner.hide();
      },
      error => { this.spinner.hide(); },
      () => this.spinner.hide()
    );
  }


  onPlanProductSearch(event: any) {
    this.planProductService.find('code~' + event.query).subscribe(
      data => {

        this.planProductCodeList = data.map(f => f.code)

      }
    );
  }



  onSearchClicked() {

    const buffer = new EmsBuffer();


    if (this.planProductcodeSearch != null && this.planProductcodeSearch !== '') {
      buffer.append(`code~${this.planProductcodeSearch}`);
    }

  
    this.page = 0;
    const searchQuery = buffer.getValue();
    this.loadData(searchQuery);
  }

  reset() {
    this.planProductcodeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData();
  }




  onDeleteAll() {

    if (this.selectPlanProducts.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectPlanProducts.map(x => x.id);

          this.planProductService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectPlanProducts.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }


}
