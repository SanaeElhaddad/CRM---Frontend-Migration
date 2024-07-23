import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product';
import { ProductService } from '../../../../shared/services/api/product.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-fiche',
  templateUrl: './product-fiche.component.html',
  styleUrls: ['./product-fiche.component.css']
})
export class ProductFicheComponent implements OnInit {
  @Input() selectedProduct: Product;
  productFiche:Product;
  showDialog: boolean = false;
  productFicheForm:FormGroup;
  constructor(private productService:ProductService,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.selectedProduct=this.productService.getProduct();
    this.productFiche=this.selectedProduct;


  }


}
