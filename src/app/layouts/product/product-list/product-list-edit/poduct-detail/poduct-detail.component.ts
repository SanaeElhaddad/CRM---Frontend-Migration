import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../../shared/models/product';
import { ProductService } from '../../../../../shared/services/api/product.service';
import { CheckboxModule } from 'primeng/checkbox';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-poduct-detail',
  templateUrl: './poduct-detail.component.html',
  styleUrls: ['./poduct-detail.component.css']
})
export class PoductDetailComponent implements OnInit {
  showPrice:boolean=false;
  product:Product;
  productForm: FormGroup;
  constructor( private activateRouter :ActivatedRoute,
     private productService:ProductService,private formBuilder: FormBuilder) { }

  ngOnInit() {

    let id=this.activateRouter.snapshot.params['id'];
    if(id){
      this.productService.findById(id).subscribe((data)=>{
        console.log(data);
        this.product=data;

       this.product.active = (data.active === true);
       this.product.stocked = (data.stocked === true);
       this.initForm();
        console.log(this.product)
      })
    }

  }

   initForm(){
    this.productForm=this.formBuilder.group({
      code:new FormControl(this.product.code, Validators.required),
      desc:new FormControl(this.product.desc),
      description:new FormControl(this.product.description),
      productCategory:new FormControl(this.product.productCategory),
      productType:new FormControl(this.product.productType),
      active:new FormControl(this.product.active),
      stocked:new FormControl(this.product.stocked)
    })
   }



}
