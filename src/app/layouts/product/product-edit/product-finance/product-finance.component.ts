import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../../../shared/services/api/product.service';
import { Product } from '../../../../shared/models/product';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Currency } from '../../../../shared/models/Currency';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../../../shared/services/api/currency.service';

@Component({
  selector: 'app-product-finance',
  templateUrl: './product-finance.component.html',
  styleUrls: ['./product-finance.component.css']
})
export class ProductFinanceComponent implements OnInit {
   financeProduct:Product;
   @Output() productFinance = new EventEmitter<Product>();
   financeForm:FormGroup;
   codeCurrency:Array<Currency>=[];
   subscriptions = new Subscription();
  constructor(private productService:ProductService,
              private formBuilder:FormBuilder,
              private currencyService:CurrencyService
   ) { }

  ngOnInit() {
    this.financeProduct=this.productService.getProduct();
    this.initForm();


  }
  initForm(){
    this.financeForm=this.formBuilder.group({
      currency:new FormControl(this.financeProduct.currency, Validators.required),
      salePriceUB:new FormControl(this.financeProduct.salePriceUB),
      purshasePriceUB:new FormControl(this.financeProduct.purshasePriceUB),
      marginOfPurchase:new FormControl(this.financeProduct.marginOfPurchase),
      costsOfReturn:new FormControl(this.financeProduct.costsOfReturn),
      marginOfCostsOfReturn:new FormControl(this.financeProduct.marginOfCostsOfReturn),
      discount:new FormControl(this.financeProduct.discount),
      maintenanceCost:new FormControl(this.financeProduct.maintenanceCost)

    })
   }

   onCodeSearch() {
    this.subscriptions.add(
      this.currencyService.findAll().subscribe((data) => {
        this.codeCurrency = data;

      })
    );
  }


}
