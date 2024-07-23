import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/models/product';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../shared/services/api/product.service';
import { Subscription } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-edit',
  templateUrl: './product-list-edit.component.html',
  styleUrls: ['./product-list-edit.component.css']
})
export class ProductListEditComponent implements OnInit {

  @Input() selectProduct= new Product();
  @Output() showDialog = new EventEmitter<Boolean>();
  isFormSubmitted = false;
  displayDialog: boolean=false;
  title = "Détail produit";
  subscriptions = new Subscription();
  ProductForm: FormGroup;
  ref: DynamicDialogRef;
  constructor(private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {

    this.displayDialog = true;
    console.log(this.selectProduct);
    console.log("cc");

    this.initForm();
  }
  initForm() {
 this.ProductForm=new FormGroup({
  "code":new FormControl({ value:this.selectProduct.code}),
  "desc":new FormControl({ value:this.selectProduct.desc}),
  "productType":new FormControl({ value:this.selectProduct.productType}),
 })
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
    this.resetForm();
  }

  onSubmitForm() {
    this.spinner.show();
    this.subscriptions.add(
      this.productService.findById(this.selectProduct.id).subscribe(
        (data) => {

          this.displayDialog = false;
        },
        () => {
          this.spinner.hide();
        }
      )
      )
  }
  resetForm() {
    this.selectProduct.code = null;
    this.selectProduct.description = null;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
getProduct(){
 // this.productService.setProduct(this.selectProduct);
  this.router.navigateByUrl('/core/product/detail/'+this.selectProduct.id)
}
}
