import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductPackService } from '../../../../../shared/services/api/ProductPack.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductPack } from '../../../../../shared/models/ProductPack';
import { Product } from '../../../../../shared/models/product';
import { AliasService } from '../../../../../shared/services/api/alias.service';
import { Alias } from '../../../../../shared/models/alias';
import { UomService } from '../../../../../shared/services/api/uom.service';
import { Uom } from '../../../../../shared/models/uom';

@Component({
  selector: 'app-product-conditionnement-edit',
  templateUrl: './product-conditionnement-edit.component.html',
  styleUrls: ['./product-conditionnement-edit.component.scss']
})
export class ProductConditionnementEditComponent implements OnInit {
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() productPack = new EventEmitter<ProductPack>();
  p:ProductPack;
  @Input() editMode: number;
  alias:Array<Alias>=[];
  uom:Array<Uom>=[];
  title = "Editer un Conditionnement";
  displayDialog: boolean=false;
  subsriptions = new Subscription();
  productPackForm:FormGroup;
  @Input() productPackSelected = new ProductPack;
  constructor(private productPackService:ProductPackService,
              private formBuilder: FormBuilder,
              private messageService:MessageService,
              private spinner: NgxSpinnerService,
              private aliasService:AliasService,
              private uomService:UomService) { }

  ngOnInit() {
    if (this.editMode === 1) {
     this.productPackSelected = new ProductPack();
     this.title = "Editer prix de produit par zone";
     }
    this.displayDialog=true;
    this.initForm();
  }
  initForm(){
    this.productPackForm=this.formBuilder.group({
      alias:new FormControl(this.productPackSelected.alias),
      uom:new FormControl(this.productPackSelected.uom),
      owner:new FormControl(this.productPackSelected.owner),
      salePrice:new FormControl(this.productPackSelected.salePrice),
    }

    );
  }
  onSubmitForm(){
    if(this.productPackForm.value["alias"]!==null){
      let aliasProduct: Alias =new Alias();
      aliasProduct.eanCode=this.productPackForm.value["alias"];
      this.productPackSelected.alias= aliasProduct;
    }
    this.productPackSelected.uom=this.productPackForm.value["uom"];
    this.productPackSelected.owner=this.productPackForm.value["owner"];
    this.productPackSelected.salePrice=this.productPackForm.value["salePrice"];
    this.productPackSelected.quantity=this.productPackForm.value["quantity"];
    this.productPack.emit(this.productPackSelected);

  }
  onSearchCode(event: any) {
    this.subsriptions.add(
      this.aliasService.findAll().subscribe((data) => {
        this.alias = data;
      })
    );
    this.subsriptions.add(
      this.uomService.findAll().subscribe((data) => {
        this.uom = data;
      })
    );
  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
