import { MessageService } from 'primeng/api';
import { ProductType } from './../../../shared/models/ProductType';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/api/product.service';
import { Subscription } from 'rxjs';
import { ProductTypeService } from '../../../shared/services/api/product-type.service';
import { Alias } from '../../../shared/models/alias';
import { Vat } from '../../../shared/models/Vat';
import { UomService } from '../../../shared/services/api/uom.service';
import { Uom } from '../../../shared/models/uom';
import { VatService } from '../../../shared/services/api/vat.service';
import { ProductFormService } from '../../../shared/services/api/ProductForm.service';
import { ProductForm } from '../../../shared/models/ProductForm';
import { AliasService } from '../../../shared/services/api/alias.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductPriceByZoneServiceService } from '../../../shared/services/api/product-price-by-zone-service.service';
import { ImageService } from '../../../shared/services/api/Image.service';
import { ProductPackService } from '../../../shared/services/api/ProductPack.service';
import { Currency } from '../../../shared/models/Currency';
import { CurrencyService } from '../../../shared/services/api/currency.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  codeSearch:ProductType;
  showDialog:boolean=false;
  selectedProduct:Product;
  financeProduct:Product;
  codeList:Array<ProductType>=[];
  uomCode:Array<Uom>=[];
  alias:Array<Alias>=[];
  vat:Array<Vat>=[];
  productFormCode:Array<ProductForm>=[];
  showPrice:boolean=false;
  product:Product;
  productForm: FormGroup;
  subscriptions = new Subscription();
  showProductSelected:boolean=false;
  codeCurrency:Array<Currency>=[];
  constructor( private activateRouter :ActivatedRoute,
               private productService:ProductService,
               private formBuilder: FormBuilder,
               private productTypeService:ProductTypeService,
               private uomService:UomService,
               private vatService:VatService,
               private productFormService:ProductFormService,
               private aliasService:AliasService,
               private messageService:MessageService,
               private spinner: NgxSpinnerService,
               private productPriceByZoneService:ProductPriceByZoneServiceService,
               private router:Router,
               private imageService:ImageService,
               private productPackService:ProductPackService,
               private currencyService:CurrencyService) { }

  ngOnInit() {

    let id=this.activateRouter.snapshot.params['id'];
    console.log("id: "+id);
    if(id){
      this.productService.findById(id).subscribe((data)=>{
       this.product=data;
       this.initForm();
       console.log("test data: ");

       console.log(this.product);

       this.productService.setProduct(this.product);
       this.product.active = (data.active === true);
       this.product.stocked = (data.stocked === true);
       //this.initForm();
       this.selectedProduct=this.product;
       this.financeProduct=this.product;
       this.showProductSelected=true;
       console.log(this.selectedProduct.id)
      })
    }
    else{
      this.product= new Product();
      this.showProductSelected=true;
    }
  this.initForm()
  this.currencyService.findAll().subscribe((data) => {
    this.codeCurrency = data;});
  }

   initForm(){
    this.productForm=this.formBuilder.group({
      code:new FormControl(this.product?.code, Validators.required),
      desc:new FormControl(this.product?.desc),
      shortDesc:new FormControl(this.product?.shortDesc),
      description:new FormControl(this.product?.description),
      alias:new FormControl(this.product?.alias),
      productCategory:new FormControl(this.product?.productCategory),
      productType:new FormControl(this.product?.productType),
      productForm:new FormControl((this.product?.productForm)),
      supplier:new FormControl(this.product?.supplier),
      vat:new FormControl(this.product?.vat),
      uomByProductUomBase:new FormControl(this.product?.uomByProductUomBase),
      uomByProductUomSale:new FormControl(this.product?.uomByProductUomSale),
      active:new FormControl(this.product?.active),
      stocked:new FormControl(this.product?.stocked),
      currency:new FormControl(this.product?.currency, Validators.required),
      salePriceUB:new FormControl(this.product?.salePriceUB),
      purshasePriceUB:new FormControl(this.product?.purshasePriceUB),
      marginOfPurchase:new FormControl(this.product?.marginOfPurchase),
      costsOfReturn:new FormControl(this.product?.costsOfReturn),
      marginOfCostsOfReturn:new FormControl(this.product?.marginOfCostsOfReturn),
      discount:new FormControl(this.product?.discount),
      maintenanceCost:new FormControl(this.product?.maintenanceCost),
      technicalSheet:new FormControl(this.product?.technicalSheet)

    })
   }
   setValue(){

    this.product.code=this.productForm.value['code'];
    this.product.desc=this.productForm.value['desc'];
    this.product.shortDesc=this.productForm.value["shortDesc"];
    this.product.description=this.productForm.value["description"];
    this.product.alias=this.productForm.value["alias"];
    this.product.productCategory=this.productForm.value["productCategory"];
    this.product.productType=this.productForm.value["productType"];
    this.product.productForm=this.productForm.value["productForm"];
    this.product.supplier=this.productForm.value["supplier"];
    this.product.vat=this.productForm.value["vat"];
    this.product.uomByProductUomBase=this.productForm.value["uomByProductUomBase"];
    this.product.uomByProductUomSale=this.productForm.value["uomByProductUomSale"];
    this.product.active=this.productForm.value["active"];
    this.product.stocked=this.productForm.value["stocked"];
    this.product.currency=this.productForm.value["currency"];
    this.product.salePriceUB=this.productForm.value["salePriceUB"];
    this.product.purshasePriceUB=this.productForm.value["purshasePriceUB"];
    this.product.marginOfPurchase=this.productForm.value["marginOfPurchase"];
    this.product.costsOfReturn=this.productForm.value["costsOfReturn"];
    this.product.marginOfCostsOfReturn=this.productForm.value["marginOfCostsOfReturn"];
    this.product.discount=this.productForm.value["discount"];
    this.product.maintenanceCost=this.productForm.value["maintenanceCost"];
    this.product.technicalSheet=this.productForm.value["technicalSheet"];
    this.product.productPriceByZones=this.productPriceByZoneService.getProductPriceByZone();
    this.product.images=this.imageService.getImage();
    this.product.productPacks=this.productPackService.getProductPack();
    //console.log(this.product);
    this.productService.set(this.product).subscribe(data=>{
      console.log(data);

      this.messageService.add({
        severity: "success",
        summary: "Edition",
        detail: "l'element est Enregistré avec succès",
      });
    },
    (error) => {
      this.messageService.add({
        severity: "error",
        summary: "Erreur",
        detail: JSON.stringify(error),
      });
    },
    () => {
      this.spinner.hide();
    }

    );

  }
  annuler(){
    this.router.navigateByUrl('/core/product/list')

  }

   onCodeSearch(event: any) {
    this.subscriptions.add(
      this.productTypeService.find("code~" + event.query).subscribe((data) => {
        this.codeList = data;
      })
    );

  }
  onProductFormSearch(event: any) {
    this.subscriptions.add(
      this.productFormService.find("code~" + event.query).subscribe((data) => {
        this.productFormCode = data;
      })
    );
  }
  onUomSearch(event: any) {
    this.subscriptions.add(
      this.uomService.find("uomCode~" + event.query).subscribe((data) => {
        this.uomCode = data;
      })
    );
  }
  onSearchAlias(event: any) {
    this.subscriptions.add(
      this.aliasService.findAll().subscribe((data) => {
        this.alias = data;
      })
    );
  }
  onSearchVat(event: any) {
    if(event.query==""){
     this.vatService.findAll().subscribe((data) => {
       this.vat = data;
      });

    }
    else{
    this.subscriptions.add(
      this.vatService.find("vatValue:" + event.query).subscribe((data) => {
        this.vat = data;
      })
    );
    }
  }

onShowDialog(event){

this.showDialog = true;
console.log(event);
}
}
