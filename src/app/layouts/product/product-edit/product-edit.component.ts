import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ControlPlan } from './../../../shared/models/control-plan';
import { Product, ProductPack, ProductType, Uom, Vat } from './../../../shared/models';
import { AuthenticationService } from './../../../shared/services';
import { ProductPackService } from './../../../shared/services/api/product-pack.service';
import { ProductTypeService } from './../../../shared/services/api/product-type.service';
import { ProductService } from './../../../shared/services/api/product.service';
import { UomService } from './../../../shared/services/api/uom.service';
import { VatService } from './../../../shared/services/api/vat.service';
import { ControlePlanService } from './../../../shared/services/api/control-plan.service';
import { PlanProductService } from './../../../shared/services/api/plan-product.service';
import { PlanProduct } from './../../../shared/models/plan-product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  @Input() selectedProduct: Product;
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  selectProductPack = new ProductPack()

  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un produit';
  productForm: FormGroup;
  vats: Vat[];
  uoms: Uom[];
  productTypeList: ProductType[];
  subscriptions = new Subscription();
  editMd :boolean;
  vat = new Vat();
  planProductList: PlanProduct[] = [];

  constructor(
    private productTypeService: ProductTypeService,
    private authentificationService:AuthenticationService,
    private productPackService: ProductPackService,
    private productService: ProductService,
    private vatService: VatService,
    private uomService: UomService,
    private messageService: MessageService,

    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private planProductService : PlanProductService) { }

  ngOnInit() {

    this.subscriptions.add(this.productTypeService.findAll().subscribe((data: ProductType[]) => {
      this.productTypeList = data;
  }));
  this.subscriptions.add(this.vatService.findAll().subscribe((data: Vat[]) => {
      this.vats = data;
    }));

    this.subscriptions.add(this.uomService.findAll().subscribe((data: Uom[]) => {
      this.uoms = data;
  
      
    }));
    this.editMd=true;

    if (this.editMode === 1) {
      this.selectedProduct = new Product();
      this.title = 'Ajouter un produit';
      this.editMd=false;

    } 

    this.displayDialog = true;
    this.initForm();

    console.log(this.selectedProduct);
    
 
 
  }

  initForm() {

    this.productForm = new FormGroup({
      code: new FormControl(this.selectedProduct.code,Validators.required),
      description: new FormControl(this.selectedProduct.desc),
      type: new FormControl(this.selectedProduct.productType,Validators.required),
      uom: new FormControl( this.selectedProduct.uomByProductUomBase,Validators.required),
      planProduct : new FormControl( this.selectedProduct.planProduct),

  });

  }
  onSubmit() {
console.log("click");

    this.isFormSubmitted = true;
    if (this.productForm.invalid) { return; }
    console.log("apreds");

    this.spinner.show();
    this.selectedProduct.code = this.productForm.value['code'];
    this.selectedProduct.desc = this.productForm.value['description'];
   
  this.selectedProduct.uomByProductUomBase = this.productForm.value[
    'uom'
  ];

    this.selectedProduct.active = true;
  //this.selectedProduct.vat== this.vats.filter(f=> f.value== this.productForm.value['vat'])[0];;
    this.selectedProduct.owner=this.authentificationService.getDefaultOwner();
    this.selectProductPack.uom=this.selectedProduct.uomByProductUomBase;
    this.selectProductPack.quantity=1;
    
    //console.log(this.selectedProduct);
  console.log(this.selectedProduct);
  
     this.subscriptions.add(this.productService.set(this.selectedProduct).subscribe(
      dataP => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
    console.log(dataP);
    
         // this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();
        },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

      //  this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    ));


  }

  onSearchProduct(event: any) {
    this.subscriptions.add(this.productTypeService.find(`code~${event.query}`).subscribe(
        data => {
            this.productTypeList = data;
        }
    ));
}

onSelectProductType(type: ProductType) {

  this.selectedProduct.productType = type as ProductType;

}

onSelectPlanProduct(event: any) {
  this.selectedProduct.planProduct = event;
  
 console.log( this.selectedProduct.planProduct);
 
}


onSelectUom(event) {
  
  this.selectedProduct.uomByProductUomBase = event.value as Uom;
  this.selectedProduct.uomByProductUomPurshase = event.value as Uom;
  this.selectedProduct.uomByProductUomSale = event.value as Uom;

 /* this.productForm.patchValue({
      uom: this.selectedProduct.uomByProductUomBase
  });*/

}



onPlanProductSearch(event: any) {
  console.log(event);
  
  this.subscriptions.add( this.planProductService
    .find('description~' + event.query)
    .subscribe(data => (this.planProductList = data)));
}











  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
