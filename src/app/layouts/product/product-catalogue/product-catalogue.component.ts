import { Component, OnInit } from '@angular/core';
import { ProductType } from '../../../shared/models/ProductType';
import { ProductTypeService } from '../../../shared/services/api/product-type.service';
import { Subscription } from 'rxjs';
import { EmsBuffer } from '../../../shared/utils/ems-buffer';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.scss']
})
export class ProductCatalogueComponent implements OnInit {
  productTypeList: Array<ProductType> = [];
  subscriptions = new Subscription();
  codeSearch: ProductType;
  productType: ProductType[];
  searchQuery:string="";

  constructor(private productTypeService:ProductTypeService) { }

  ngOnInit() {


   this.getAllProductType();
  }
  oncodeProductTypeSearch(event: any) {
    this.subscriptions.add(this.productTypeService.find('code~' + event.query).subscribe(
      data => this.productTypeList = data
    ));
  }
  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch.code !== '') {
      buffer.append(`code~${this.codeSearch.code}`);
    }
    this.searchQuery = buffer.getValue();
    this.productTypeService.find(this.searchQuery).subscribe(data=>{
       this.productType=data;
      console.log(this.productType);

     })
  }
  reset() {
    this.codeSearch = null;
    this.getAllProductType();
  }
 getAllProductType(){
  this.productTypeService.findAll().subscribe(data=>{
    this.productType=data;
    console.log(this.productType[0]);

  })
 }

}
